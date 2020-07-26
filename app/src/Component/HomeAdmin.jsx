import React, { useContext, useEffect, useState } from 'react'
import { Jumbotron, Button, Table } from 'reactstrap';
import { AdminAuthContext } from '../App';
import "./CSS/HomePage.css"
import axios from 'axios'

const api = 'http://localhost:3002'

export default function HomeAdmin() {
    const { state, dispatch } = useContext(AdminAuthContext)
    const [anggota, setAnggota] = useState([])
    
    useEffect(() => {
        console.log("Memanggil Use Effect")
        axios.get(api + '/anggota' ).then(res => {
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
            <h2>Daftar Anggota</h2>
            <hr />
            <Table className="table-bordered">
                <thead>
                    <tr>
                        <th>No. Anggota</th>
                        <th>Nama</th>
                        <th>Tempat, tanggal lahir</th>
                        <th>Alamat</th>
                        <th>Status</th>
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
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}
