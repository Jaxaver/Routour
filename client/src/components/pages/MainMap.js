import React, { Component } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import MapServices from '../../service/MapServices.service'
import mapStyles from "../../mapStyles"
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;



class MainMap extends Component {
  constructor(props) {
    super(props)
    this._service = new MapServices()

    this.state = {
      response: null,
      travelMode: 'WALKING',
      origin: '',
      originLatLng: {},
      destination: '',
      radius: 0,
      type: "",
      keyword: "",
      waypoints: []
    }

    this.directionsCallback = this.directionsCallback.bind(this)
    this.getOrigin = this.getOrigin.bind(this)
    // this.getDestination = this.getDestination.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.getWaypoints = this._service.getWaypoints.bind(this)
    this.getLocation = this._service.getLocation.bind(this)
  }

  directionsCallback(response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response,
            origin: "",
            destination: "",

            radius: 0,
            type: "",
            // keyword: ""
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  // CHECKS DE RADIUS
  checkRadius(e) {
    const prueba = e.target.value
    console.log("soy el console", prueba)

    this.setState({ radius: prueba })
 
  }


  onHandleChange = e => {
    let { name, value } = e.target
    this.setState(
      () => ({
        [name]: value,   
      })
    )

  }



  getOrigin(ref) {
    this.origin = ref
    // this.destination = this.state.origin
  }

 

  // this.setState({
  //   coaster: { ...this.state.coaster, [name]: value }
  // })


  onSubmitHandler() { //REQUEST API
    
    this.getLocation(this.state.origin)
      .then(this.getWaypoints(this.state.originLatLng, this.state.radius, this.state.types = "tourist attraction", "touristic"))
      .then(response => {

   
        console.log("respuesta del getWaypoints", response)
      }) //aquí van parámetros de búsqueda
      .catch(console.log("catch"))
  }

  onMapClick(...args) {
    console.log('onClick args: ', args)
  }


  render() {
    return (
      <>
        <form>
          <div className='map-settings'>
            <hr className='mt-0 mb-3' />

            <div className='row'>

              <div className='col-md-6 col-lg-4'>
                <div className='form-group'>
                  <label htmlFor='ORIGIN'>Address</label>
                  <br />
                  <input id='ORIGIN' name="origin" className='form-control' type='text' onChange={(e) => this.onHandleChange(e)} ref={this.getOrigin} />
                </div>
              </div>

              {/* <div className='col-md-6 col-lg-4'>
                <div className='form-group'>
                  <label htmlFor='DESTINATION'>Destination</label>
                  <br />
                  <input id='DESTINATION' name="destination" className='form-control' onChange={(e) => this.onHandleChange(e)} type='text' ref={this.getDestination} />
                </div>
              </div> */}
            </div>


            {/* RADIUS FORMULARY */}
            <div className='d-flex flex-wrap'>
              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='LESSTHANANHOUR'
                  className='custom-control-input'
                  name='radius'
                  type='radio'
                  value={500}
                  onChange={(e) => this.checkRadius(e)} ///handlechange?
                />
                <label className='custom-control-label' htmlFor='LESSTHANANHOUR'>Have a quick walk</label>
              </div>

              <div className='form-group custom-control custom-radio mr-4'>
                <input
                  id='MORETHANANHOUR'
                  className='custom-control-input'
                  name='radius'
                  value={2000}
                  type='radio'
                  onChange={(e) => this.checkRadius(e)}
                />
                <label className='custom-control-label' htmlFor='MORETHANANHOUR'>I'm in no rush</label>
              </div>
            </div>
            {/* RADIUS FORMULARY END */}





            <button onClick={() => this.onSubmitHandler()} className='btn btn-primary' type='button' >
              Recommend Route
          </button>
          </div>
        </form>

        <LoadScript id="script-loader"
          googleMapsApiKey="AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g">
          <GoogleMap
            id='example-map'
            mapContainerStyle={{
              height: "400px",
              width: "800px",
              

            }}
            zoom={7}
            center={{
              lat: -3.745,
              lng: -38.523
            }}
            options= {{styles: mapStyles}}    // esta es la buena
            
          >
            {
              (
                this.state.destination !== '' &&
                this.state.origin !== ''
              ) && (
                <DirectionsService //REQUERIDO
                  options={{ //REQUERIDO
                    waypoints: [{ location: "el pirulí, madrid", stopover: true }, { location: "estatua del angel caido, madrid", stopover: false }],
                    destination: this.state.destination,
                    origin: this.state.origin,
                    travelMode: "WALKING",

                    radius: this.state.radius,
                    type: this.state.type,
                    keyword: this.state.keyword
                  }}

                  callback={this.directionsCallback}
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />
              )
            }

            {
              this.state.response !== null && (


                <DirectionsRenderer //REQUERIDO
                  options={{
                    directions: this.state.response //REQUERIDO
                  }}
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />


              )
            }


          </GoogleMap>
        </LoadScript>

      </>

    )
  }
}




export default MainMap
