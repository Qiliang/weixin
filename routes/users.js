var _ = require('underscore');
var nosql = require('nosql').load('db/users.nosql');

exports.list = function (req, res) {
    nosql.all('', function(users) {
        res.send(users);
    });

};

exports.save = function (req, res) {

    nosql.insert(req.body);
    res.send(req.body);
};