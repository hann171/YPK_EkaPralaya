import React, { Fragment, useContext, useState } from 'react'
import axios from 'axios'
import { CardImg, Container, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { AuthContext } from '../App'
import {Link} from 'react-router-dom'
const qs = require('querystring')

const api = 'http://localhost:3002'

export default function LoginComp() {

    const { dispatch } = useContext(AuthContext)
    const initialState = {
        username: "",
        password: "",
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
            username: data.username,
            password: data.password
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
                username:'',
                password:''
            })
    }

    return (
        <Fragment>
            <Container>
                <br />
                <Row>
                    <Col>
                        <CardImg width="100%" src="https://placeimg.com/640/380/people/" />
                    </Col>
                    <Col>
                        <Form className="form" onSubmit={handleFormSubmit}>
                            <Label for="Username">Username</Label>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="text" name="username" id="UsernameField" value={data.username} onChange={handleInputChange} placeholder="Masukan username" />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Label for="Password">Password</Label>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input type="password" name="password" id="PasswordField" value={data.password} onChange={handleInputChange} placeholder="Masukan password" />
                                    </Col>
                                </Row>
                            </FormGroup>

                            {data.errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {data.errorMessage}
                                </div>
                            ) }
                            <Button disabled={data.isSubmiting}>
                                {data.isSubmiting ? (
                                    "..Loading"
                                ):
                                (
                                    "Login"
                                )
                            }
                            </Button>
                        </Form>
                        <p>Belum punya akun? <Link to="/user/register">SIGN UP</Link></p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
