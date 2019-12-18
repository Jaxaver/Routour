import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import MapServices from '../../service/MapServices.service'

// import CoastersService from '../../service/Coaster.service'
// import FilesService from '../../service/Files.service'


class ExperienceForm extends Component {
    constructor(props) {
        super(props)
        this._mapService = new MapServices()
        // this._filesService = new FilesService()
        this.state = {
            disabledButton: false,
            buttonText: 'Share experience',
            experience: {
                user: "",
                description: "",
                imageUrl: ""
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this._mapService.postExperience(this.state.experience)
            .then(x => {
                console.log("submitiando")
                // this.props.closeModalWindow()
                // this.props.updateCoastersList()
            })
            .catch(err => console.log(err))
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            experience: { ...this.state.experience, [name]: value }
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="user" onChange={this.handleInputChange} value={this.state.experience.title} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" onChange={this.handleInputChange} value={this.state.experience.description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Imagen URL (archivo)</Form.Label>
                    <Form.Control name="imageUrl" type="file" onChange={this.handleFileUpload} />
                </Form.Group>
                <Button variant="dark" size="sm" type="submit" disabled={this.state.disabledButton}>{this.state.buttonText}</Button>
            </Form>
        )
    }
}

export default ExperienceForm