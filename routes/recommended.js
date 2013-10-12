var _ = require('underscore');

exports.list = function (req, res) {
    console.info(req.protocol +'://'+req.host + req.originalUrl);
    res.render('recommended', { title: '今日推荐' });

};

