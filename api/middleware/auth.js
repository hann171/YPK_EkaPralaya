var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../respon');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//Controller Register
exports.regist = function(req,res){
    var post = {
        nama_lengkap: req.body.nama_lengkap,
        ttl: req.body.ttl,
        agama: req.body.agama,
        no_telp: req.body.no_telp,
        pekerjaan: req.body.pekerjaan,
        alamat: req.body.alamat,
        status: req.body.status,
    }

    var query = "SELECT nama_lengkap FROM ?? WHERE ??=?";
    var table = ["anggota","nama_lengkap", post.nama_lengkap];

    query = mysql.format(query,table);
    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }
        else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["anggota"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Selamat bergabung", res);
                    }
                });
            }else{
                response.ok("Kamu sudah terdaftar menjadi anggota!",res);
            }
        }
    })
}

//controller login
exports.login = function(req,rest){
    var post = {
        username: req.body.username,
        password: req.body.password
        
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user","username",post.username,"password",md5(post.password)];

    query = mysql.format(query,table);
     
    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                });
                id_user = rows[0].id_user;
                username = rows[0].username;
                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query,table);
                
                connection.query(query,data,function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        rest.json({
                            success: true,
                            message: 'Token JWT Generated!',
                            token:token,
                            currUser: data.id_user,
                            user: username
                        });
                    }
                });
            }else{
                 rest.json({"Error": true, "Message":"email atau password salah"});
            }
        }
    });
}