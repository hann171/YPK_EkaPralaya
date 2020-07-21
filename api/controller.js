'use strict';

var response = require('./respon');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Rest API is going", res)
};