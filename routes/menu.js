var querystring = require('querystring');
var https = require('https');
var http = require('http');
var appId = 'wx5fd925f24cd51ceb';
var appSecret = 'd211ea7010c6465308942788ef0bb267';

exports.list = function (req, res) {
    res.render('menu', { title: '菜单' });
};

