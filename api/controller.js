'use strict';

var response = require('./respon');
var connection = require('./koneksi');

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
