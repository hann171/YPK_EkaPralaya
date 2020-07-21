import React, { PureComponent } from 'react'
import axios from 'axios'
import { Alert, Container, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const api = 'http://localhost:3002'

export default class UserRegist extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            status:'2',
            response: '',
            color:'',
            display:'none'
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    register = () => {
        axios.post(api+'/auth/register',{
            username: this.state.username,
            password: this.state.password,
            status: this.state.status
        }).then(json => {
            if(json.data.status === 200){
                if(json.data.values === 'User baru telah ditambahkan'){
                    this.setState({
                        response: json.data.values,
                        color:'success',
                        display: 'block',
                    })
                }
                else if(json.data.values === 'Username sudah terdaftar!'){
                    this.setState({
                        response: json.data.values,
                        color:'danger',
                        display: 'block'
                    })
                }
            }else{
                this.setState({
                    response: json.data.values,
                    display: 'block'
                })
            }
        })
        this.setState({username:''})
        this.setState({password:''})
    }

    render() {
        return (
            <Container>
                <Alert color={this.state.color} style={{display: this.state.display}}>
                    {this.state.response}
                </Alert>
                <Form className="form">
                    <Label for="Username">Username</Label>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Input type="text" name="username" id="UsernameField" value={this.state.username} onChange={this.handleChange} placeholder="Masukan username" />
                            </Col>
                        </Row>
                    </FormGroup>
                    <Label for="Password">Password</Label>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Input type="password" name="password" id="PasswordField" value={this.state.password} onChange={this.handleChange} placeholder="Masukan password" />
                            </Col>
                        </Row>
                    </FormGroup>
                    <Button onClick={this.register}>SIGN UP</Button>
                </Form>
            </Container>
        );
    }
}
