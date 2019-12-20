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
                className="welcome"
                style={{
                    // margin: 0,
                    padding: 0,
                    alignContent: "space-between",


                }}
            >
                {this.state.experiences !== null &&
                    (<Row>
                        {this.state.experiences.map(experience => experience.user == this.props.loggedInUser && <CardMap key={experience.user} {...experience} />)}
                    </Row>)}
                <div className="welcometext">
                    <section>
                        <h1>Lost in another city?</h1>
                        <br></br> <br></br>
                        <h2>There's always time for a walk!</h2>
                    </section>
                </div>
            </Container>
        )
    }
}

export default Index