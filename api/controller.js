'use strict';

var response = require('./respon');
var connection = require('./koneksi');

exports.index = function (req, rest) {
    response.ok("Rest API is going", respon)
};