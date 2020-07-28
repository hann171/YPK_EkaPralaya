import React, { PureComponent } from 'react'
import axios from 'axios'
import qs from 'querystring'
import { Table, Button, Container, navlink, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'

import './CSS/Anggota.css'

const api = 'http://localhost:3002'
export default class Anggota extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            anggota: [],
            response: '',
            display: 'none'
        }
    }

    componentDidMount() {
        axios.get(api + '/anggota').then(res => {
            this.setState({
                anggota: res.data.values
            })
        })
    }

    DeleteAnggota = (idAnggota) => {
        const { anggota } = this.state
        const data = qs.stringify({
            id_anggota: idAnggota
        })

        axios.delete(api + '/anggota/hapus',
            {
                data: data,
                headers: { 'Content-type': 'application/x-www-form-urlencoded' }
            }
        ).then(json => {
            if (json.data.status === 200) {
                this.setState({
                    response: json.data.values,
                    anggota: anggota.filter(anggota => anggota.id_anggota !== idAnggota),
                    display: 'block'
                })
            } else {
                this.setState({

                    response: json.data.values,
                    display: 'block'
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Alert color="success" style={{ display: this.state.display }}>
                    {this.state.response}
                </Alert>
                <p className="headertabel-anggota">Daftar Anggota</p>
                <Link to="/admin/anggota/tambah" >   
                     <button className="btn-tambah-anggota">Tambah</button>
                </Link>
                <hr />
                <div className="tabel-anggota">
                    <Table className="tabel-head-anggota">
                        <thead>
                            <tr>
                                <th>No. Anggota</th>
                                <th>Nama Lengkap</th>
                                <th>Tempat, tanggal lahir</th>
                                <th>Agama</th>
                                <th>No. Telp</th>
                                <th>Pekerjaan</th>
                                <th>Alamat</th>
                                <th>Status Kawin</th>
                                <th>Status Keanggotaan</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.anggota.map(anggota =>
                                <tr key={anggota.id_anggota}>
                                    <td>{anggota.id_anggota}</td>
                                    <td>{anggota.nama_lengkap}</td>
                                    <td>{anggota.ttl}</td>
                                    <td>{anggota.agama}</td>
                                    <td>{anggota.no_telp}</td>
                                    <td>{anggota.pekerjaan}</td>
                                    <td>{anggota.alamat}</td>
                                    <td>{anggota.status_kawin}</td>
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
                                        <button className="btn-del-anggota" onClick={() => this.DeleteAnggota(anggota.id_anggota)} color="danger">Hapus</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
