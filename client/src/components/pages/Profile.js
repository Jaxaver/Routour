import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import MapServices from '../../service/MapServices.service'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import CardMap from "../pages/CardMap"


class Index extends Component {
    constructor(props) {
        super(props)
        this._service = new MapServices()
        this.state = {
            experiences: null
        }

    }

    //neceistamos los datos de localhost3000/map/oldmaps
    //necesitamos el componente simple map y pasarle los datos
    componentDidMount() {
        this._service.getMaps()
            .then(res =>{
                res.data.filter(elm => elm.user === this.state.loggedInUser)
                this.setState({ experiences: res.data })
            })
    }


    render() {
        return (
            <>
            <div className="jajaja"></div>
            <Container>
                
                {this.state.experiences !== null && 
                (<Row className="my-maps-container">
                    {this.state.experiences.map(experience => <CardMap key={experience.user} {...experience}/> )}
                </Row>)}
            </Container>
            </>
        )
    }
}

export default Index