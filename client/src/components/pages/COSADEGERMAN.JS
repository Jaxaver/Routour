import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

// import CoastersService from '../../service/Coaster.service'
// import FilesService from '../../service/Files.service'

class CoasterForm extends Component {

    constructor(props) {
        super(props)
        this._coastersService = new CoastersService()
        this._filesService = new FilesService()
        this.state = {
            disabledButton: false,
            buttonText: 'Crear montaña rusa',
            coaster: {
                title: "",
                description: "",
                inversions: 0,
                length: 0,
                imageUrl: ""
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this._coastersService.postCoaster(this.state.coaster)
            .then(x => {
                this.props.closeModalWindow()
                this.props.updateCoastersList()
            })
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            coaster: { ...this.state.coaster, [name]: value }
        })
    }

    handleFileUpload = e => {
        this.setState({ disabledButton: true, buttonText: 'Subiendo imagen...' })

        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this._filesService.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.data.secure_url)
                this.setState({
                    disabledButton: false,
                    buttonText: 'Crear montaña rusa',
                    coaster: { ...this.state.coaster, imageUrl: response.data.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="title" onChange={this.handleInputChange} value={this.state.coaster.title} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" onChange={this.handleInputChange} value={this.state.coaster.description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Longitud</Form.Label>
                    <Form.Control type="number" name="length" onChange={this.handleInputChange} value={this.state.coaster.length} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Inversiones</Form.Label>
                    <Form.Control type="number" name="inversions" onChange={this.handleInputChange} value={this.state.coaster.inversions} />
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


export default CoasterForm