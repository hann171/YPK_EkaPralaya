import React, { PureComponent } from 'react'
import axios from 'axios'
import qs from 'querystring'
import { Table, Button, Container, navlink, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'

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

    delAnggota = (idAnggota) => {
        const { anggota } = this.state
        const data = qs.stringify({
            id_anggota: idAnggota
        })

        axios.delete(api + '/anggota/hapus',
            {
                data: data,
                headers: { 'Content-type': 'application/x-ww-form-urlencoded' }
            }
        ).then(json => {
            if (json.data.status === 200) {
                this.setState({
                    response: json.data.values,
                    anggota: anggota.filter(anggota => anggota.id_anggota !== idAnggota),
                    display: 'block'
                })
            }
            else {
                this.setState({
                    response: json.data.values,
                    display: 'block'
                })
            }
        })
    }

    render() {
        return (
            <Container>
                <h2>Data Anggota</h2>
                <Alert color="success" style={{ display: this.state.display }}>
                    {this.state.response}
                </Alert>
                <Table className="table-bordered">
                    <thead>
                        <tr>
                            <th>No. Anggota</th>
                            <th>Nama Lengkap</th>
                            <th>TTL</th>
                            <th>Alamat</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.anggota.map(anggota =>
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
                                                state:{
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
                                        <Button>Edit</Button>
                                        <span> </span>
                                    </Link>
                                    <Button onClick={() => this.delAnggota(anggota.id_anggota)} color="danger">Hapus</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        )
    }
}
