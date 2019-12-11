import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Service from './service/Auth.service'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

/* CUSTOM COASTER COMPONENTS */
/* CUSTOM UI COMPONENTS */
import Navbar from './components/ui/Navbar'

/* CUSTOM PAGE COMPONENTS */
import Index from './components/pages/Index'
import Profile from './components/pages/Profile'
import MainMap, { MyFancyComponent } from './components/pages/MainMap'


// import Profile from './components/pages/Profile'


/* CUSTOM AUTH COMPONENTS */
import { Container, Row, Button, Modal } from "react-bootstrap"



import Signup from './components/auth/Signup'
import Login from './components/auth/Login'



class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      // isMarkerShown: false,
    }
    this._service = new Service()
  }

  // componentDidMount() {
  //   this.delayedShowMarker()
  // }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 3000)
  // }

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }








  setTheUser = user => {
    this.setState({ loggedInUser: user })
    console.log("El método 'setTheUser' de App.js se ha invocado, pasando al estado 'loggedInUser:", this.state.loggedInUser)
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service.loggedin()
        .then(theLoggedInUserFromTheServer => this.setState({ loggedInUser: theLoggedInUserFromTheServer.data }))
        .catch(err => {
          this.setState({ loggedInUser: false })
          console.log({ err })
        })
    }
  }


  render() {

    this.fetchUser()

    return (
      <>
        <Navbar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser} />

        <Switch>

          <Route exact path="/" component={Index} />
          <Route path="/signup" render={match => <Signup setUser={this.setTheUser} {...match} />} />
          <Route path="/login" render={match => <Login setUser={this.setTheUser} {...match} />} />
          <Route path="/profile" render={() =>
            this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />
          } />
          <Route path="/map" render={() =>
            this.state.loggedInUser ?
              <>
                {/* <MainMap loggedInUser={this.state.loggedInUser} containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />} /> */}
                {/* <MyFancyComponent loggedInUser={this.state.loggedInUser} /> */}
                
                  <MainMap />
              </>
              :
              <Redirect to="/" />
          } />

        </Switch>

      </>

    )
  }
}

export default App;