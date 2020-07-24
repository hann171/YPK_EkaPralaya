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
            namaLegkap: '',
            password: '',
            status: '2',
            response: '',
            color: '',
            display: 'none'
        }
    }

    status = (props) => {
        const [rSelected, setRSelected] = useState(null);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    register = () => {
        axios.post(api + '/auth/register', {
            username: this.state.namaLegkap,
            password: this.state.password,
            status: this.state.status
        }).then(json => {
            if (json.data.status === 200) {
                if (json.data.values === 'User baru telah ditambahkan') {
                    this.setState({
                        response: json.data.values,
                        color: 'success',
                        display: 'block',
                    })
                }
                else if (json.data.values === 'Username sudah terdaftar!') {
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
        this.setState({ username: '' })
        this.setState({ password: '' })
    }

    mouseHover(e) {
        e.target.style.background = '#1caca9';
    }
    mouseHoverLeave(e) {
        e.target.style.background = '#24CFCB';
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
                    <Form className="input-form-daftar" onSubmit={this.register}>
                        <div className="field">
                            <Label className="label-daftar" for="namaLengkap">Nama Lengkap</Label>
                            <input className="input-daftar" type="text" name="namaLengkap" id="namaLengkap" value={this.state.namaLegkap} onChange={this.handleChange} placeholder="Masukan nama lengkap" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="ttl">Tempat, Tanggal Lahir</Label>
                            <input className="input-daftar" type="password" name="ttl" id="ttl" value={this.state.password} onChange={this.handleChange} placeholder="Tempat, dd/mm/yyyy" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="agama">Agama</Label>
                            <input className="input-daftar" type="text" name="agama" id="agama" onChange={this.handleChange} placeholder="Masukan agama" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="notelp">No. Telp</Label>
                            <input className="input-daftar" type="number" name="noTelp" id="notelp" onChange={this.handleChange} placeholder="Masukan no.telp" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="pekerjaan">Pekerjaan</Label>
                            <input className="input-daftar" type="text" name="pekerjaan" id="pekerjaan" onChange={this.handleChange} placeholder="Masukan pekerjaan" />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" id="alamat" for="alamat">Alamat</Label>
                            <textarea className="input-daftar textarea" type="textarea" name="alamat" id="alamat" onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <Label className="label-daftar" for="status">Status*</Label>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => {this.status.setRSelected(1)}} active={this.status.rSelected === 1}>One</Button>
                                <Button color="primary" onClick={() => {this.status.setRSelected(2)}} active={this.status.rSelected === 2}>Two</Button>
                                <Button color="primary" onClick={() => {this.status.setRSelected(3)}} active={this.status.rSelected === 3}>Three</Button>
                            </ButtonGroup>
                        </div>

                        <button type="submit" className="daftar-button" onMouseOver={this.mouseHover} onMouseLeave={this.mouseHoverLeave}>DAFTAR</button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}
