'use strict';

var response = require('./respon');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Rest API is going", res)
};

//menampilkan semua data anggota
exports.tampilAnggota = function (req, rest) {
    connection.query('SELECT * from anggota' , function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, rest)
        }
    });
};