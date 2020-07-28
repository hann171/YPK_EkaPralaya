import React, { Fragment, PureComponent, useState } from 'react'
import axios from 'axios'
import { Alert, Container, ButtonGroup, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import "./CSS/AddAnggota.css"

const api = 'http://localhost:3002'

export default class TambahAnggota extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            namaLengkap: '',
            ttl: '',
            agama: '',
            notelp: '',
            pekerjaan: '',
            alamat: '',
            statusKawin: '',
            statusKeanggotaan:'',
            status: '2',
            response: '',
            color: '',
            display: 'none'
        }

        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    register = () => {
        axios.post(api + '/anggota/tambah', {
            nama_lengkap: this.state.namaLengkap,
            ttl: this.state.ttl,
            agama: this.state.agama,
            noTelp: this.state.notelp,
            pekerjaan: this.state.pekerjaan,
            alamat: this.state.alamat,
            status_kawin: this.state.statusKawin,
            status_keanggotaan: this.state.statusKeanggotaan,
            status: this.state.status
        }).then(json => {
            if (json.data.status === 200) {
                if (json.data.values === 'Anggota baru telah ditambahkan') {
                    this.setState({
                        response: json.data.values,
                        color: 'success',
                        display: 'block',
                    })
                }
                else if (json.data.values === 'Anggota sudah terdaftar!') {
                    this.setState({
                        response: json.data.values,
                        color: 'danger',
                        display: 'block'
                    })
                }
            } else {
                this.setState({
                    response: json.data.values,
                    display: 'block'
                })
            }
        })
        this.setState({ namaLengkap: '' })
        this.setState({ ttl: '' })
        this.setState({ agama: '' })
        this.setState({ notelp: '' })
        this.setState({ pekerjaan: '' })
        this.setState({ alamat: '' })
        this.setState({ statusKawin: '' })
        this.setState({ statusKeanggotaan: '' })
    }

    mouseHover(e) {
        e.target.style.background = '#1caca9';
    }
    mouseHoverLeave(e) {
        e.target.style.background = '#24CFCB';
    }

    handleRadioChange(event) {
        // set the new value of checked radion button to state using setState function which is async funtion
        this.setState({
            statusKawin: event.target.value,
        });
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Alert color={this.state.color} style={{ display: this.state.display }}>
                        {this.state.response}
                    </Alert>
                    <h1 className="daftar_text">Tambah Anggota</h1>
                    <Form className="input-form-daftar">
                        <div className="field">
                            <Label className="label-daftar" for="nama">Nama Lengkap</Label>
                            <input className="input-daftar" type="text" name="namaLengkap" id="nama" value={this.state.namaLengkap} onChange={this.handleChange} placeholder="Masukan nama lengkap" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="ttl">Tempat, Tanggal Lahir</Label>
                            <input className="input-daftar" type="text" name="ttl" id="ttl" value={this.state.ttl} onChange={this.handleChange} placeholder="Tempat, dd/mm/yyyy" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="agama">Agama</Label>
                            <input className="input-daftar" type="text" name="agama" id="agama" value={this.state.agama} onChange={this.handleChange} placeholder="Masukan agama" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar">No. telp</Label>
                            <input type="number" className="input-daftar" name="notelp" value={this.state.notelp} onChange={this.handleChange} placeholder="Masukan nomor telp" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="pekerjaan">Pekerjaan</Label>
                            <input className="input-daftar" type="text" name="pekerjaan" id="pekerjaan" value={this.state.pekerjaan} onChange={this.handleChange} placeholder="Masukan pekerjaan" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" id="alamat" for="alamat">Alamat</Label>
                            <textarea className="input-daftar textarea" type="textarea" name="alamat" id="alamat" value={this.state.alamat} onChange={this.handleChange} />
                        </div>
                        <div className="fieldStatusKawin">
                            <Label className="label-daftar" id="statuskawin" for="statuskawin">Status Kawin*</Label>
                            <ButtonGroup className="input-daftar-radio">
                                <Button className="btn-radio" value='Menikah' color="primary" onClick={this.handleRadioChange} active={this.state.statusKawin === 'Menikah'}>Menikah</Button>
                                <Button className="btn-radio" value='Belum Menikah' color="primary" onClick={this.handleRadioChange} active={this.state.statusKawin === 'Belum Menikah'}>Belum Menikah</Button>
                                <Button className="btn-radio" value='Pernah Menikah' color="primary" onClick={this.handleRadioChange} active={this.state.statusKawin === 'Pernah Menikah'}>Pernah Menikah</Button>
                            </ButtonGroup>
                        </div>
                        <div className="field-status">
                            <p className="p-status">*) Pilih salah satu</p>
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="statusKeanggotaan">Status Keanggotaan</Label>
                            <input className="input-daftar" type="text" name="statusKeanggotaan" id="statusKeanggotaan" value={this.state.statusKeanggotaan} onChange={this.handleChange} placeholder="Tempat, dd/mm/yyyy" />
                        </div>
                        <button onClick={this.register} className="daftar-button" onMouseOver={this.mouseHover} onMouseLeave={this.mouseHoverLeave}>TAMBAH</button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}
