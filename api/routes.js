'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);
    app.route('/anggota')
        .get(jsonku.tampilAnggota);
    app.route('/anggota/new')
        .get(jsonku.tampilAnggotaBaru);
    app.route('/anggota/hapus')
        .delete(jsonku.hapusAnggota);
    app.route('/anggota/edit')
        .put(jsonku.editAnggota);
    app.route('/anggota/tambah')
        .post(jsonku.addAnggota);
}