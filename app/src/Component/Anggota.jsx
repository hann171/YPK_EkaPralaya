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
            mahasiswa: [],
            response: '',
            display: 'none'
        }
    }

    componentDidMount() {
        axios.get(api + '/anggota').then(res => {
            this.setState({
                mahasiswa: res.data.values
            })
        })
    }

    DeleteAnggota = (idAnggota) => {
        const { mahasiswa } = this.state
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
                    mahasiswa: mahasiswa.filter(mahasiswa => mahasiswa.id_anggota !== idAnggota),
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
            <Container>
                <h2>Data Mahasiswa</h2>
                <Alert color="success" style={{ display: this.state.display }}>
                    {this.state.response}
                </Alert>
                <navlink><Button color="success" href="/mahasiswa/tambah">Tambah Data</Button></navlink>
                <hr />
                <Table className="table-bordered">
                    <thead>
                        <tr>
                            <th>NIM</th>
                            <th>Nama</th>
                            <th>Jurusan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.mahasiswa.map(mahasiswa =>
                            <tr key={mahasiswa.id_anggota}>
                                <td>{mahasiswa.nim}</td>
                                <td>{mahasiswa.nama_lengkap}</td>
                                <td>{mahasiswa.jurusan}</td>
                                <td>
                                    <Link to=
                                        {
                                            {
                                                pathname: `/mahasiswa/edit`,
                                                state: {
                                                    id_mahasiswa: mahasiswa.id_mahasiswa,
                                                    nim: mahasiswa.nim,
                                                    nama: mahasiswa.nama,
                                                    jurusan: mahasiswa.jurusan
                                                }
                                            }
                                        }>
                                        <Button>Edit</Button>
                                        
                                    </Link>
                                    <span> </span>
                                    <Button onClick={()=>this.DeleteAnggota(mahasiswa.id_anggota)} color="danger">Hapus</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        )
    }
}
