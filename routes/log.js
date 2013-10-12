exports.list = function (req, res) {
    var Log = require('log')
        , fs = require('fs')
        , stream = fs.createReadStream('my.log')
        , log = new Log('debug', stream);
    var text = [];
    log.on('line', function (line) {
        text.push(line);
    });
    log.on('end', function () {
        res.send(text);
    });
};