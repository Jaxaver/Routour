import React, { Component } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import MapServices from '../../service/MapServices.service'
import { Modal, DropdownButton, Dropdown, Nav, Button, Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import mapStyles1 from "../../styles/mapStyles1"
import mapStyles2 from "../../styles/mapStyles2"
import mapStyles3 from "../../styles/mapStyles3"
import mapStyles4 from "../../styles/mapStyles4"

import "../../styles/styles.css"

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
      waypoints: [],
      currentMapStyle: mapStyles1,
      mapDrawn: false,
      loggedInUser: this.props.loggedInUser,
      show: false,
      description: ""
    }

    this._mapService = new MapServices()
    this.directionsCallback = this.directionsCallback.bind(this)
    // this.getOrigin = this.getOrigin.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.getWaypoints = this._service.getWaypoints.bind(this)
    this.getLocation = this._service.getLocation.bind(this)
    this.checkRadius = this._service.checkRadius.bind(this)
    // this.checkMapStyle = this._service.checkMapStyle.bind(this)

  }



  handleClose() {
    this.setState({ show: false })
  }
  handleShow() {
    this.setState({ show: true })
  }



  directionsCallback(response) {
    console.log("directions callback", response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response,
          })
        )
      } else {
        console.log('loloolololololololololo: ', response)
      }
    }
  }

  onHandleChange = e => {
    let { name, value } = e.target
    this.setState(
      () => ({
        [name]: value,
      })
    )
  }

  onSubmitHandler() { //REQUEST API

    this.setState({ mapDrawn: false })

    this.getLocation(this.state.origin)                  //posible problema
      .then(() => {

        this.getWaypoints(this.state.originLatLng, this.state.radius)
      })
      .then(response => {
        console.log(response)
        console.log(this.state, "response final pero final de verdad")
      })
      .catch((err) => console.log("getWaypoints da error:", err))
  }

  onMapClick(...args) {
    console.log('onClick args: ', args)
  }

  handleInputChange = e => {
    let { name, value } = e.target
    this.setState({
      experience: { ...this.state.experience, [name]: value }
    })
  }

  postNewExperience() {
    this._mapService.saveMap(this.state)
      .then(x => {
        console.log("submitiando", x)
        // this.props.closeModalWindow()
        // this.props.updateCoastersList()
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="background">
        <form>
          <div className='map-settings'>
            <hr className='mt-0 mb-3' />

            <div className='row searcher'>
              <div>
                <div className='col-md-6 col-lg-4 searchbar'>
                  <div className='form-group'>
                    <label htmlFor='ORIGIN'></label>
                    <br />
                    <input id='ORIGIN' name="origin" className='form-control' type='text' onChange={(e) => this.onHandleChange(e)}
                    // ref={this.getOrigin} 
                    />
                  </div>
                </div>

              </div>


              {/* RADIUS FORMULARY */}
              <div className='d-flex flex-wrap'>
                <div className='form-group custom-control custom-radio mr-4'>
                  <input
                    id='LESSTHANANHOUR'
                    className='custom-control-input'
                    name='radius'
                    type='radio'
                    value={1000}
                    onChange={(e) => this.checkRadius(e)} ///handlechange?
                  />
                  <label className='custom-control-label' htmlFor='LESSTHANANHOUR'>Have a quick walk</label>
                </div>
                <div className='form-group custom-control custom-radio mr-4'>
                  <input
                    id='MORETHANANHOUR'
                    className='custom-control-input'
                    name='radius'
                    value={2500}
                    type='radio'
                    onChange={(e) => this.checkRadius(e)}
                  />
                  <label className='custom-control-label' htmlFor='MORETHANANHOUR'>I'm in no rush</label>
                </div>
              </div>
            </div>


            <button className="recommend-button" onClick={() => this.onSubmitHandler()} className='btn btn-primary' type='button' >
              Recommend Route
            </button>
          </div>
        </form>
        <div className="map-and-share">
        <div className="map-container">
        <LoadScript id="script-loader"
          googleMapsApiKey="AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g">
          <GoogleMap
            loggedInUser={this.state.loggedInUser}
            id='main-map'
            mapContainerStyle={{
              height: "35vw",
              width: "65vw",
              borderRadius: 50,
            }}
            className= "mapa"
            zoom={2}
            center={{
              lat: 20,
              lng: 110
            }}
            options={{
              styles: this.state.currentMapStyle,
              disableDefaultUI: true
            }}    // esta es la buena
          >
            {
              (
                this.state.origin !== '' && !this.state.mapDrawn
              ) && (
                <DirectionsService //REQUERIDO
                  options={{ //REQUERIDO
                    waypoints: [{ location: this.state.waypoints[0], stopover: true }, { location: this.state.waypoints[1], stopover: true }, { location: this.state.waypoints[2], stopover: true }],
                    destination: this.state.origin,
                    origin: this.state.origin,
                    travelMode: "WALKING",
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
                    this.setState({ mapDrawn: true })
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
        </div>
        
            <div className="map-buttons">

        <Button variant="primary" onClick={() => this.handleShow()}>
          Share your experience
      </Button>

        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* A METER EN MÓDULO APARTE  */}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" name="description" onChange={this.onHandleChange} value={this.state.description} />
                {/* handleInputChange ESTÁ MAL */}
              </Form.Group>
              {/* <Button variant="dark" size="sm" type="submit" disabled={this.state.disabledButton}>Share!</Button> */}
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={() => {
              this.postNewExperience()
              this.handleClose()
            }
            }>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
        





        <form>
          <DropdownButton
            id="dropdown-basic-button"
            title="Map Styles"
          >
            <Dropdown.Item onClick={() => this.setState({ currentMapStyle: mapStyles1 })} id="1">estilo 1</Dropdown.Item>
            <Dropdown.Item onClick={() => this.setState({ currentMapStyle: mapStyles2 })} id="2">estilo 2</Dropdown.Item>
            <Dropdown.Item onClick={() => this.setState({ currentMapStyle: mapStyles3 })} id="3">estilo 3</Dropdown.Item>
            <Dropdown.Item onClick={() => this.setState({ currentMapStyle: mapStyles4 })} id="3">estilo 4</Dropdown.Item>
          </DropdownButton>
        </form>
        </div>
        </div>
      </div>

    )
  }
}




export default MainMap
