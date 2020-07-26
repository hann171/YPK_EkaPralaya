var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../respon');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//Controller Register
exports.regist = function (req, res) {
    var post = {
        nama_lengkap: req.body.nama_lengkap,
        ttl: req.body.ttl,
        agama: req.body.agama,
        no_telp: req.body.noTelp,
        pekerjaan: req.body.pekerjaan,
        alamat: req.body.alamat,
        status_kawin: req.body.status_kawin,
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
                        response.ok("Selamat bergabung", res);
                    }
                });
            } else {
                response.ok("Kamu sudah terdaftar menjadi anggota!", res);
            }
        }
    })
}

//controller login
exports.login = function (req, rest) {
    var post = {
        nama_lengkap: req.body.nama_lengkap,
        no_telp: req.body.noTelp
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["anggota", "nama_lengkap", post.nama_lengkap, "no_telp", post.no_telp];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                });
                id_anggota = rows[0].id_anggota;
                nama_lengkap = rows[0].nama_lengkap;
                var data = {
                    id_user: id_anggota,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);

                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        rest.json({
                            success: true,
                            message: 'Token JWT Generated!',
                            token: token,
                            currUser: data.id_user,
                            user: nama_lengkap
                        });
                    }
                });
            } else {
                rest.json({ "Error": true, "Message": "email atau password salah" });
            }
        }
    });
}

exports.admin = function (req, rest) {
    var post = {
        nama_lengkap: req.body.nama_lengkap,
        no_telp: req.body.noTelp
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["anggota", "nama_lengkap", post.nama_lengkap, "no_telp", post.no_telp];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                });
                status = rows[0].status;
                id = rows[0].id_anggota;
                username_admin = rows[0].nama_lengkap;

                if (token) {
                    //verifikasi
                    jwt.verify(token, config.secret, function (err, decoded) {
                        if (err) {
                            return rest.status(401).send({ auth: false, message: 'token tidak terdaftar!' });
                        } else {
                            var data = {
                                id_user: id,
                                access_token: token,
                                ip_address: ip.address()
                            }

                            var query = "INSERT INTO ?? SET ?";
                            var table = ["akses_token"];

                            query = mysql.format(query, table);

                            connection.query(query, data, function (error, rows) {
                                if (error) {
                                    console.log(error);
                                }
                            });

                            if (status == 1) {
                                req.auth = decoded;
                                rest.json({
                                    success: true,
                                    message: 'Token JWT Generated!',
                                    currUser: data.id_user,
                                    user: username_admin
                                });
                            } else {
                                return rest.status(401).send({ auth: false, message: 'Gagal mengotorisasi role anda!' });
                            }
                        }
                    });
                } else {
                    return rest.status(401).send({ auth: false, message: 'token tidak tersedia!' });
                }

            } else {
                rest.json({ "Error": true, "Message": "Username atau password salah" });
            }
        }
    });
}