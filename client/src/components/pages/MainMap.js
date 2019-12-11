import React, { Component } from 'react'
import { compose, withProps, lifecycle } from "recompose"

import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import InfoBox from "react-google-maps/lib/components/addons/InfoBox"

const MainMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `80%`, width: `80%` }} />, // ESTILOS DE MAPA
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(41.8507300, -87.6512600),
        destination: new google.maps.LatLng(41.8525800, -87.6514100),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })

)((props) =>

  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.85073, lng: -87.65126 }}
  >
    {/* <Marker position={{ lat: -34.397, lng: 150.644 }} /> 
    MARKER A PELO */}


    <Marker
      position={{ lat: 22.627, lng: 120.301 }}>
      <InfoBox
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B`, fontFamily: `helvetica` }}>
            Hello, Kaohsiung!
          </div>
        </div>
      </InfoBox>
    </Marker>
    {/* MARKER CON INFO */}

    {props.directions ? <DirectionsRenderer directions={props.directions} /> : "<></>"}

  </GoogleMap>
)





export default MainMap
