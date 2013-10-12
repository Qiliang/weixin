exports.list = function (req, res) {
    res.send(req.param('user'));
};