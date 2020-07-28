import React, { useContext, useEffect, useState, Fragment } from 'react'
import { Jumbotron, Button, Table, Navbar, NavItem } from 'reactstrap';
import { AdminAuthContext } from '../App';
import "./CSS/HomeAdmin.css"
import {Link} from 'react-router-dom'
import axios from 'axios'

const api = 'http://localhost:3002'

export default function HomeAdmin() {
    const { state, dispatch } = useContext(AdminAuthContext)
    const [anggota, setAnggota] = useState([])

    useEffect(() => {
        console.log("Memanggil Use Effect")
        axios.get(api + '/anggota/new').then(res => {
            setAnggota(res.data.values)
        })
    }, [])

    function mouseHover(e) {
        e.target.style.background = '#046ac4';
    }
    function mouseHoverLeave(e) {
        e.target.style.background = '#098AFB';
    }
    return (
        <div>
            <div className="tabel">
                <p className="headertabel">Daftar Anggota</p>
                <Table className="tabel-head">
                    <thead>
                        <tr>
                            <th>No. Anggota</th>
                            <th>Nama</th>
                            <th>Tempat, tanggal lahir</th>
                            <th>Alamat</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {anggota.map(anggota =>
                            <tr key={anggota.id_anggota}>
                                <td>{anggota.id_anggota}</td>
                                <td>{anggota.nama_lengkap}</td>
                                <td>{anggota.ttl}</td>
                                <td>{anggota.alamat}</td>
                                <td>{anggota.status_keanggotaan}</td>
                                <td>
                                <Link to=
                                            {
                                                {
                                                    pathname: `/admin/anggota/edit`,
                                                    state: {
                                                        id_anggota: anggota.id_anggota,
                                                        nama_lengkap: anggota.nama_lengkap,
                                                        ttl: anggota.ttl,
                                                        agama: anggota.agama,
                                                        no_telp: anggota.no_telp,
                                                        pekerjaan: anggota.pekerjaan,
                                                        alamat: anggota.alamat,
                                                        status_kawin: anggota.status_kawin,
                                                        status_keanggotaan: anggota.status_keanggotaan
                                                    }
                                                }
                                            }>
                                            <button className="btn-edit-anggota">Edit</button>
                                        </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="tabel2">
                <p className="headertabel">Berita Duka Cita</p>
                <Table className="tabel-head">
                    <thead>
                        <tr>
                            <th>No. Anggota</th>
                            <th>Nama</th>
                            <th>Tempat, tanggal lahir</th>
                            <th>Alamat</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {anggota.map(anggota =>
                            <tr key={anggota.id_anggota}>
                                <td>{anggota.id_anggota}</td>
                                <td>{anggota.nama_lengkap}</td>
                                <td>{anggota.ttl}</td>
                                <td>{anggota.alamat}</td>
                                <td>{anggota.status_keanggotaan}</td>
                                <td>
                                <Link to=
                                            {
                                                {
                                                    pathname: `/admin/anggota/edit`,
                                                    state: {
                                                        id_anggota: anggota.id_anggota,
                                                        nama_lengkap: anggota.nama_lengkap,
                                                        ttl: anggota.ttl,
                                                        agama: anggota.agama,
                                                        no_telp: anggota.no_telp,
                                                        pekerjaan: anggota.pekerjaan,
                                                        alamat: anggota.alamat,
                                                        status_kawin: anggota.status_kawin,
                                                        status_keanggotaan: anggota.status_keanggotaan
                                                    }
                                                }
                                            }>
                                            <button className="btn-edit-anggota">Edit</button>
                                        </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
