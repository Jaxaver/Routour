import React, { Component } from 'react'
import { Button, Form, Container } from 'react-bootstrap'

import Service from '../../service/Auth.service'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            showToast: false,
            toastText: '',
            user: { username: '', password: '' }
        }
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }


    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state.user
        this._service.login(username, password)
            .then(theLoggedUser => {
                this.props.setUser(theLoggedUser.data)
                this.setState({ username: '', password: '' })
                this.props.history.push('/')            // REDIRECCIONAMIENTO
            })
            .catch(err => {
                console.log(err)
            })
    }



    render() {
        return (
            <Container>

                <h1>Iniciar sesión</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name="username" onChange={this.handleInputChange} value={this.state.username} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleInputChange} value={this.state.password} />
                    </Form.Group>
                    <Button variant="dark" type="submit">Iniciar sesión</Button>
                </Form>

            </Container >
        )
    }
}


export default LoginForm