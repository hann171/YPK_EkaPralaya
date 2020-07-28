import React, { PureComponent } from 'react'
import axios from 'axios'
import qs from 'querystring'
import { Link } from 'react-router-dom'
import { Container, Form, Col, Row, FormGroup, Alert, Label, Input, Button } from 'reactstrap'

const api = "http://localhost:3002"

export default class EditAnggota extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            id_anggota: this.props.location.state.id_anggota,
            nama_lengkap: this.props.location.state.nama_lengkap,
            ttl: this.props.location.state.ttl,
            agama: this.props.location.state.agama,
            no_telp: this.props.location.state.no_telp,
            pekerjaan: this.props.location.state.pekerjaan,
            alamat: this.props.location.state.alamat,
            status_kawin: this.props.location.state.status_kawin,
            status_keanggotaan: this.props.location.state.status_keanggotaan,
            response: '',
            display: 'none'
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    ubahAnggota = (idAnggota) => {
        const data = qs.stringify({
            id_anggota: idAnggota,
            nama_lengkap: this.state.nama_lengkap,
            ttl: this.state.ttl,
            agama: this.state.agama,
            no_telp: this.state.no_telp,
            pekerjaan: this.state.pekerjaan,
            alamat: this.state.alamat,
            status_kawin: this.state.status_kawin,
            status_keanggotaan: this.state.status_keanggotaan
        });

        axios.put(api + '/anggota/edit', data)
        .then(json => {
            if(json === 200){
                this.setState({
                    response: json.data.values,
                    display: 'block'
                })
            }
            else{
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
                <h4>Form Edit Data</h4>
                <Alert color="success" style={{ display: this.state.display }}>
                    {this.state.response}
                </Alert>
                <Form className="form">
                    <Col>
                        <Label>Nama Lengkap</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="nama_lengkap" value={this.state.nama_lengkap} onChange={this.handleChange} placeholder="Masukan nama_lengkap" />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Label>Tempat Tanggal Lahir</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="ttl" value={this.state.ttl} onChange={this.handleChange} placeholder="Masukan ttl" />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Label>Agama</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="agama" value={this.state.agama} onChange={this.handleChange} placeholder="Masukan agama" />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Label>No. telp</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="no_telp" value={this.state.no_telp} onChange={this.handleChange} placeholder="Masukan no_telp" />
                                </Col>
                            </Row>
                        </FormGroup>
                        
                        <Label>Pekerjaan</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="pekerjaan" value={this.state.pekerjaan} onChange={this.handleChange} placeholder="Masukan pekerjaan" />
                                </Col>
                            </Row>
                        </FormGroup>
                        
                        <Label>Alamat</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="alamat" value={this.state.alamat} onChange={this.handleChange} placeholder="Masukan alamat" />
                                </Col>
                            </Row>
                        </FormGroup>
                        
                        <Label>Status Kawin</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="status_kawin" value={this.state.status_kawin} onChange={this.handleChange} placeholder="Masukan status_kawin" />
                                </Col>
                            </Row>
                        </FormGroup>
                        
                        <Label>Status Keanggotaan</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input type="text" name="status_keanggotaan" value={this.state.status_keanggotaan} onChange={this.handleChange} placeholder="Masukan status_keanggotaan" />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Button type="button" color="success" onClick={()=>this.ubahAnggota(this.state.id_anggota)}>UPDATE</Button>
                    </Col>
                </Form>
            </Container>
        )
    }
}
