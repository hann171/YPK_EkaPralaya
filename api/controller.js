'use strict';

var response = require('./respon');
var connection = require('./koneksi');
var mysql = require('mysql');

exports.index = function (req, res) {
    response.ok("Rest API is going", res)
};

//menampilkan semua data anggota
exports.tampilAnggota = function (req, res) {
    connection.query('SELECT * from anggota', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.tampilAnggotaBaru = function (req, res) {
    connection.query('SELECT * from anggota ORDER BY id_anggota DESC LIMIT 5', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.hapusAnggota = function (req, res) {
    var id_anggota = req.body.id_anggota;

    connection.query('DELETE from anggota WHERE id_anggota = ?', [id_anggota],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.ok('berhasil menghapus data',res)
            }
        });
};

//mengubah data berdasarkan id
exports.editAnggota = function (req, res) {
    var id_anggota = req.body.id_anggota;
    var nama_lengkap = req.body.nama_lengkap;
    var ttl = req.body.ttl;
    var agama = req.body.agama;
    var no_telp = req.body.no_telp;
    var pekerjaan = req.body.pekerjaan;
    var alamat = req.body.alamat;
    var status_kawin = req.body.status_kawin;
    var status_keanggotaan = req.body.status_keanggotaan;

    connection.query('UPDATE anggota SET nama_lengkap=?, ttl=?, agama=?, no_telp=?, pekerjaan=?, alamat=?, status_kawin=?, status_keanggotaan=? WHERE id_anggota=?', [nama_lengkap,ttl,agama,no_telp,pekerjaan,alamat,status_kawin,status_keanggotaan,id_anggota],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.ok('berhasil mengupdate data',res)
            }
        });
};

exports.addAnggota = function (req, res) {
    var post = {
        nama_lengkap: req.body.nama_lengkap,
        ttl: req.body.ttl,
        agama: req.body.agama,
        no_telp: req.body.noTelp,
        pekerjaan: req.body.pekerjaan,
        alamat: req.body.alamat,
        status_kawin: req.body.status_kawin,
        status_keanggotaan: req.body.status_keanggotaan,
        status: req.body.status
    }

    var query = "SELECT nama_lengkap FROM ?? WHERE ??=?";
    var table = ["anggota", "nama_lengkap", post.nama_lengkap];

    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["anggota"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Anggota baru telah ditambahkan", res);
                    }
                });
            } else {
                response.ok("Anggota sudah terdaftar!", res);
            }
        }
    })
};