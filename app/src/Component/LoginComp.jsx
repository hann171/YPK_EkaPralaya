import React, { Fragment, useContext, useState } from 'react'
import axios from 'axios'
import { CardImg, Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
import { AuthContext } from '../App'
import { Link } from 'react-router-dom'
import "./CSS/LoginPage.css"

const qs = require('querystring')

const api = 'http://localhost:3002'

export default function LoginComp() {

    const { dispatch } = useContext(AuthContext)
    const initialState = {
        namaLengkap: "",
        noTelp: "",
        isSubmiting: false,
        errorMessage: null
    }

    const [data, setData] = useState(initialState)
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        setData({
            ...data,
            isSubmiting: true,
            errorMessage: null
        })

        const requestBody = {
            nama_lengkap: data.namaLengkap,
            noTelp: data.noTelp
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(api + '/auth/login', qs.stringify(requestBody), config)
            .then(res => {
                if (res.data.success === true) {
                    dispatch({
                        type: "LOGIN",
                        payload: res.data
                    })
                }
                else {
                    setData({
                        ...data,
                        isSubmiting: false,
                        errorMessage: res.data.Message
                    })
                }

                throw res
            })
        setData({
            ...data,
            namaLengkap: '',
            noTelp: ''
        })
    }

    function mouseHover(e) {
        e.target.style.background = '#1caca9';
    }
    function mouseHoverLeave(e) {
        e.target.style.background = '#24CFCB';
    }

    return (
        <Fragment>
            <Container>
                <Row>
                    <div className="rectangle2">
                        <p className="ypk_text">Yayasan Pembantu Kematian</p>
                        <img className="ypk_logo" src={require('../Assets/Logo.png')} alt="" />
                        <p className="p_address"> Jl. MT. Haryono No. 146, Purwokerto, <br />Jawa Tengah</p>
                        <img className="service" src={require('../Assets/24jam.png')} alt="" />
                        <div className="link_daftar">
                            <div>
                                <p>Belum menjadi anggota ? <Link className="link_question" to="/register">Daftar disini</Link></p>
                            </div>
                        </div>
                    </div>
                    <Link className="link_masukAdmin" to="/admin/login">Admin</Link>
                    <p className="masuk">Masuk</p>
                    <div className="input-form">
                        <Form onSubmit={handleFormSubmit}>
                            <div>
                                <Label className="uname-label" for="username">Nama Lengkap</Label><br />
                                <input className="input-login" type="text" name="namaLengkap" id="username" value={data.namaLengkap} onChange={handleInputChange} placeholder="Masukan Nama" />
                            </div>

                            <div>
                                <Label className="pass-label" for="Password">No. Telp</Label><br />
                                <input className="input-login" type="text" name="noTelp" id="Password" value={data.noTelp} onChange={handleInputChange} placeholder="Masukan No. telp" />
                            </div>

                            <a className="link_lupaPass" href="/login">Lupa password?</a>

                            {data.errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {data.errorMessage}
                                </div>
                            )}

                            <button className="login-button" disabled={data.isSubmiting} onMouseOver={mouseHover} onMouseLeave={mouseHoverLeave}>
                                {data.isSubmiting ? (
                                    "..Loading"
                                ) :
                                    (
                                        "LOGIN"
                                    )
                                }
                            </button>
                        </Form>
                    </div>
                    <a className="link_masukNo" href="/login">Masuk dengan nomor anggota</a>
                </Row>
            </Container>
        </Fragment>
    )
}
