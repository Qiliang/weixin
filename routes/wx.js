var url = require('url'),
    querystring = require('querystring'),
    crypto = require('crypto'),
    events = require('events'),
    emitter = new events.EventEmitter(),
    xml2js = require('xml2js');

var fs = require('fs')
    , Log = require('log')
    , log = new Log('debug', fs.createWriteStream('my.log'));


exports.access = function (req, res) {
    var wechat = new Wechat();
    wechat.token = 'xiaoql';
    log.debug(req.query);
    // res.send(req.param('echostr'));
    wechat.checkSignature(req, res);
};

exports.message = function (req, res) {
    var wechat = new Wechat();
    wechat.token = 'xiaoql';
    wechat.host = 'http://xiaoql.app1101076571.twsapp.com'
    log.debug(req.query);
    wechat.handler(req, res);
    wechat.text(function (data) {
        log.debug(data);
        var msg = {
            FromUserName: data.ToUserName,
            ToUserName: data.FromUserName,
            MsgType: "news",
            ArticleCount: "1",
            Articles: [
                {
                    Title: '奶奶罩住遇马蜂袭击孙女',
                    Description: '闻讯赶来的村民营救20多分钟，老人一直保持保护孙女的姿势……　　因病情严重，转院途中老人走了，孙女至今还在重症监护室。如果遇到马蜂攻击，一定要用衣服紧紧包住头颈，反方向逃跑或原地趴下，千万不要狂跑，以免马蜂群起追击。',
                    PicUrl: 'http://upload.hbtv.com.cn/2013/0313/1363158429151.jpg',
                    Url: wechat.host + '/home/' + data.FromUserName
                }
            ]
        }
        //回复信息
        wechat.send(msg);
    });

    wechat.event(function (data) {
        log.debug(data);
        data.Event = data.Event[0];
        data.EventKey = data.EventKey[0];
        var msg = {
            FromUserName: data.ToUserName,
            ToUserName: data.FromUserName,
            MsgType: "news",
            ArticleCount: "1",
            Articles: [
                {
                    Title: '红烧排骨面',
                    Description: '用料：排骨适量，葱姜蒜适量，面条适量，蔬菜适量，盐适量，鸡精适量，老抽适量，豆瓣适量，冰糖适量',
                    PicUrl: wechat.host+'/image/m3.jpg',
                    Url: wechat.host + '/recommended'
                }
            ]
        }
        //回复信息
        wechat.send(msg);
    });
};


var Wechat = function () {
}

Wechat.prototype.token = '';

//检验 token
Wechat.prototype.checkSignature = function (req, res) {
    if (req.method === 'GET') {
        var queryObj = querystring.parse(url.parse(req.url).query);
        var signature = queryObj.signature,
            timestamp = queryObj.timestamp,
            nonce = queryObj.nonce,
            echostr = queryObj.echostr;

        var sha1 = crypto.createHash('sha1'),
            sha1Str = sha1.update([this.token, timestamp, nonce].sort().join('')).digest('hex');

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end((sha1Str === signature) ? echostr : '');
        return res;
    }
}

var RES;//存储要返回的响应

//预处理器
Wechat.prototype.handler = function (req, res) {
    RES = res;
    var xml = '';
    var self = this;

    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        xml += chunk;
    });

    req.on('end', function () {
        console.log(xml);
        self.toJSON(xml);
    });
}

//解析器
Wechat.prototype.toJSON = function (xml) {
    var msg = {};
    xml2js.parseString(xml, function (err, result) {
        var data = result.xml;

        msg.ToUserName = data.ToUserName[0];
        msg.FromUserName = data.FromUserName[0];
        msg.CreateTime = data.CreateTime[0];
        msg.MsgType = data.MsgType[0];

        switch (msg.MsgType) {
            case 'text' :
                msg.Content = data.Content[0];
                msg.MsgId = data.MsgId[0];

                emitter.emit("text", msg);
                break;

            case 'image' :
                msg.PicUrl = data.PicUrl[0];
                msg.MsgId = data.MsgId[0];
                msg.MediaId = data.MediaId[0];

                emitter.emit("image", msg);
                break;

            case 'location' :
                msg.Location_X = data.Location_X[0];
                msg.Location_Y = data.Location_Y[0];
                msg.Scale = data.Scale[0];
                msg.Label = data.Label[0];
                msg.MsgId = data.MsgId[0];

                emitter.emit("location", msg);
                break;

            case 'link' :
                msg.Title = data.Title[0];
                msg.Description = data.Description[0];
                msg.Url = data.Url[0];
                msg.MsgId = data.MsgId[0];

                emitter.emit("link", msg);
                break;

            case 'event' :
                msg.Event = data.Event[0];
                msg.EventKey = data.EventKey[0];

                emitter.emit("event", msg);
                break;

            case 'voice' :
                msg.MediaId = data.MediaId[0];
                msg.Format = data.Format[0];
                msg.MsgId = data.MsgId[0];
                msg.Recognition = data.Recognition[0];

                emitter.emit("voice", msg);
                break;

            case 'video' :
                msg.MediaId = data.MediaId[0];
                msg.ThumbMediaId = data.ThumbMediaId[0];
                msg.MsgId = data.MsgId[0];

                emitter.emit("video", msg);
                break;
        }
    });
    return msg;
}

//监听文本信息
Wechat.prototype.text = function (callback) {
    emitter.on("text", callback);
    return this;
}

//监听图片信息
Wechat.prototype.image = function (callback) {
    emitter.on("image", callback);
    return this;
}

//监听地址信息
Wechat.prototype.location = function (callback) {
    emitter.on("location", callback);
    return this;
}

//监听链接信息
Wechat.prototype.link = function (callback) {
    emitter.on("link", callback);
    return this;
}

//监听事件信息
Wechat.prototype.event = function (callback) {
    emitter.on("event", callback);
    return this;
}

//监听语音信息
Wechat.prototype.voice = function (callback) {
    emitter.on("voice", callback);
    return this;
}

//监听视频信息
Wechat.prototype.video = function (callback) {
    emitter.on("video", callback);
    return this;
}

//监听所有信息
Wechat.prototype.all = function (callback) {
    emitter.on("text", callback);
    emitter.on("image", callback);
    emitter.on("location", callback);
    emitter.on("link", callback);
    emitter.on("event", callback);
    emitter.on("voice", callback);
    emitter.on("video", callback);

    return this;
}

//将 js 组装成 xml
Wechat.prototype.toXML = function (data) {
    //自动检测 MsgType
    var MsgType = "";
    if (!data.MsgType) {
        if (data.hasOwnProperty("Content")) MsgType = "text";
        if (data.hasOwnProperty("MusicUrl")) MsgType = "music";
        if (data.hasOwnProperty("Articles")) MsgType = "news";
    } else {
        MsgType = data.MsgType;
    }

    var msg = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + data.ToUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + data.FromUserName + "]]></FromUserName>" +
        "<CreateTime>" + Date.now() / 1000 + "</CreateTime>" +
        "<MsgType><![CDATA[" + MsgType + "]]></MsgType>" +
        "<FuncFlag>" + (data.FuncFlag || 0) + "</FuncFlag>";

    switch (MsgType) {
        case 'text' :
            msg += "" +
                "<Content><![CDATA[" + (data.Content || '') + "]]></Content>" +
                "</xml>";
            return msg;

        case 'music' :
            msg += "" +
                "<Music>" +
                "<Title><![CDATA[" + (data.Title || '') + "]]></Title>" +
                "<Description><![CDATA[" + (data.Description || '') + "]]></Description>" +
                "<MusicUrl><![CDATA[" + (data.MusicUrl || '') + "]]></MusicUrl>" +
                "<HQMusicUrl><![CDATA[" + (data.HQMusicUrl || data.MusicUrl || '') + "]]></HQMusicUrl>" +
                "</Music>" +
                "</xml>";
            return msg;

        case 'news' :
            var ArticlesStr = "";
            var ArticleCount = data.Articles.length;
            for (var i in data.Articles) {
                ArticlesStr += "" +
                    "<item>" +
                    "<Title><![CDATA[" + (data.Articles[i].Title || '') + "]]></Title>" +
                    "<Description><![CDATA[" + (data.Articles[i].Description || '') + "]]></Description>" +
                    "<PicUrl><![CDATA[" + (data.Articles[i].PicUrl || '') + "]]></PicUrl>" +
                    "<Url><![CDATA[" + (data.Articles[i].Url || '') + "]]></Url>" +
                    "</item>";
            }

            msg += "<ArticleCount>" + ArticleCount + "</ArticleCount><Articles>" + ArticlesStr + "</Articles></xml>";
            return msg;
    }
}

//回复消息
Wechat.prototype.send = function (data) {
    RES.writeHead(200, {'Content-Type': 'text/plain'});
    RES.end(this.toXML(data));
    return RES;
}