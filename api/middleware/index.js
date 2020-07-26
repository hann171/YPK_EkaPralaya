var express = require('express');
var auth = require('./auth');
var router = express.Router();
//var verifikasi = require('./verifikasi');

//User Page
router.post('/register', auth.regist);
router.post('/login', auth.login);

//Admin Page
router.post('/admin/login', auth.admin);

module.exports = router;