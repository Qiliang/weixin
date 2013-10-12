var querystring = require('querystring');
var https = require('https');
var http = require('http');
var appId = 'wx5fd925f24cd51ceb';
var appSecret = 'd211ea7010c6465308942788ef0bb267';
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
var getAccessToken = function (callback) {

    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSecret;
    https.get(url,function (res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function (d) {
            var result = JSON.parse(body);
            console.log("body:  ", result.access_token);
            callback(result.access_token)
        });

    }).on('error', function (e) {
            console.error(e);
        });

};

var createMenu = function (jsonString, response) {
    getAccessToken(function (access_token) {
        var options = {
            hostname: 'api.weixin.qq.com',
            path: '/cgi-bin/menu/create?access_token=' + access_token,
//            hostname:'localhost',
//            path:'/wx',
//            port:3000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(jsonString, 'utf8')
            }
        };
        var req = https.request(options, function (res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            var body = '';
            res.on('data', function (d) {
                body += d;
            });
            res.on('end', function () {
                // var result = JSON.parse(body);
                console.log("body:  ", body);
                response.send(body);
            });
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.write(jsonString + '\n');
        req.end();

        // req.end(jsonString);
    });

};

exports.create = function (req, res) {

    var a = {
        "button": [
            {
                "type": "click",
                "name": "今日推荐",
                "key": "recommended"
            },
            {
                "type": "click",
                "name": "菜单",
                "key": "menu"
            },
            {
                "type": "click",
                "name": "位置",
                "key": "position"
            }
        ]
    };
    createMenu(JSON.stringify(a), res);
};

exports.list = function (req, res) {
    getAccessToken(function (access_token) {
        var url = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=' + access_token;
        https.get(url, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                // var result = JSON.parse(body);
                console.log("body:  ", body);
                res.send(body);
            });
        });
    });
};