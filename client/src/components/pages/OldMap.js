
https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=calle+alcala&radius=2000&type=&keyword=touristic&key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.413864,-3.696601&radius=300&type=point_of_interest,tourist_attraction&keyword=touristic&key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g



<div className='d-flex flex-wrap'>
              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='DRIVING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'DRIVING'}
                  onChange={this.checkDriving}
                />
                <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='BICYCLING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'BICYCLING'}
                  onChange={this.checkBicycling}
                />
                <label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='TRANSIT'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'TRANSIT'}
                  onChange={this.checkTransit}
                />
                <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='WALKING'
                  className='custom-control-input'
                  name='travelMode'
                  type='radio'
                  checked={this.state.travelMode === 'WALKING'}
                  onChange={this.checkWalking}
                />
                <label className='custom-control-label' htmlFor='WALKING'>Walking</label>
              </div>
            </div>









// import React, { Component } from 'react'
// import { compose, withProps, lifecycle } from "recompose"

// import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox"

// const MainMap = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `80%`, width: `80%` }} />, // ESTILOS DE MAPA
//   }),
//   withScriptjs,
//   withGoogleMap,
//   lifecycle({
//     componentDidMount() {
//       const DirectionsService = new google.maps.DirectionsService();

//       DirectionsService.route({
//         origin: new google.maps.LatLng(41.8507300, -87.6512600),
//         destination: new google.maps.LatLng(41.8525800, -87.6514100),
//         travelMode: google.maps.TravelMode.DRIVING,
//       }, (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result,
//           });
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       });
//     }
//   })

// )((props) =>

//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: 41.85073, lng: -87.65126 }}
//   >
//     {/* <Marker position={{ lat: -34.397, lng: 150.644 }} /> 
//     MARKER A PELO */}


//     <Marker
//       position={{ lat: 22.627, lng: 120.301 }}>
      // <InfoBox
      //   options={{ closeBoxURL: ``, enableEventPropagation: true }}
      // >
      //   <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
      //     <div style={{ fontSize: `16px`, fontColor: `#08233B`, fontFamily: `helvetica` }}>
      //       Hello, Kaohsiung!
      //     </div>
      //   </div>
      // </InfoBox>
//     </Marker>
//     {/* MARKER CON INFO */}

//     {props.directions ? <DirectionsRenderer directions={props.directions} /> : "<></>"}

//   </GoogleMap>
// )





// export default MainMap
