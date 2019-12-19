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
            .then(res =>
                this.setState({ experiences: res.data })
            )
    }
    // 

    render() {
        return (
            <Container
                style={{
                    // margin: 0,
                    padding: 0,
                    alignContent: "space-between",
                    width: window.innerWidth,


                }}
            >
                {this.state.experiences !== null &&
                    (<Row>
                        {this.state.experiences.map(experience => experience.user == this.props.loggedInUser && <CardMap key={experience.user} {...experience} />)}
                    </Row>)}
                <section>
                    <h1>Lost in another city?</h1>
                    <h2>Time for a walk!</h2>
                </section>
            </Container>
        )
    }
}

export default Index