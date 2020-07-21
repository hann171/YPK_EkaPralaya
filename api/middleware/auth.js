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
        username: req.body.username,
        password: md5(req.body.password),
        status: req.body.status,
    }

    var query = "SELECT username FROM ?? WHERE ??=?";
    var table = ["user","username", post.username];

    query = mysql.format(query,table);
    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }
        else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("User baru telah ditambahkan", res);
                    }
                });
            }else{
                response.ok("Email sudah terdaftar!",res);
            }
        }
    })
}