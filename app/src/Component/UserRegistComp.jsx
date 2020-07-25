import React, { Fragment, PureComponent, useState } from 'react'
import axios from 'axios'
import { Alert, Container, ButtonGroup, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import "./CSS/RegisterPage.css"

const api = 'http://localhost:3002'

export default class UserRegist extends PureComponent {
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
        axios.post(api + '/auth/register', {
            nama_lengkap: this.state.namaLengkap,
            ttl: this.state.ttl,
            agama: this.state.agama,
            noTelp: this.state.notelp,
            pekerjaan: this.state.pekerjaan,
            alamat: this.state.alamat,
            status_kawin: this.state.statusKawin,
            status: this.state.status
        }).then(json => {
            if (json.data.status === 200) {
                if (json.data.values === 'Selamat bergabung') {
                    this.setState({
                        response: json.data.values,
                        color: 'success',
                        display: 'block',
                    })
                }
                else if (json.data.values === 'Kamu sudah terdaftar menjadi anggota!') {
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
                    <div className="rectangle2">
                        <p className="ypk_text">Yayasan Pembantu Kematian</p>
                        <img className="ypk_logo" src={require('../Assets/Logo.png')} alt="" />
                        <p className="p_address"> Jl. MT. Haryono No. 146, Purwokerto, <br />Jawa Tengah</p>
                        <img className="service" src={require('../Assets/24jam.png')} alt="" />
                        <div className="link_masuk">
                            <div>
                                <p>Sudah menjadi anggota ? <Link className="link_question" to="/login">Masuk disini</Link></p>
                            </div>
                        </div>
                    </div>
                    <p className="daftar_text">Daftar Anggota</p>
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
                        <div className="field">
                            <p className="p-status">*) Pilih salah satu</p>
                        </div>
                        <button onClick={this.register} className="daftar-button" onMouseOver={this.mouseHover} onMouseLeave={this.mouseHoverLeave}>DAFTAR</button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}
