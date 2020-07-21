var express = require('express');
var auth = require('./auth');
var router = express.Router();
//var verifikasi = require('./verifikasi');

//daftarkan menu regis
router.post('/register', auth.regist);
//router.post('/api/v1/login', auth.login);

//alamat halaman otorisasi
//router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);

module.exports = router;