exports.index = function (req, res) {
    console.info(req.protocol +'://'+req.host + req.originalUrl);
    res.render('index', { title: '微信公众' });
};