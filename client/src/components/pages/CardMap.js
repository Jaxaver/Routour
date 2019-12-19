import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'

import { Link } from 'react-router-dom'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

// import MainMap from "../pages/MainMap"

const CardMap = ({ mapState }) => {

    return (
        <Col className="cardmap" md={3}>
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g"
                
            >
                <GoogleMap
                    // loggedInUser={}
                    id='lil-map'
                    mapContainerStyle={{
                        height: "200px",
                        width: "200px",
                        borderRadius: 125,
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 10,
                        marginTop: 10
                    }}
                    options={{
                        disableDefaultUI: true
                    }}
                >
                    <DirectionsRenderer //REQUERIDO
                        options={{
                            directions: mapState.response //REQUERIDO
                        }}
                        onLoad={directionsRenderer => {
                            console.log('DirectionsRenderer onLoad: ', mapState)
                        }}
                        onUnmount={directionsRenderer => {
                            console.log('DirectionsRenderer onUnmount: ', directionsRenderer)
                        }}
                    />

                </GoogleMap>
            </LoadScript>
        </Col >
    )
}


export default CardMap