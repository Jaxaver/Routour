import axios from 'axios'
import { DirectionsService } from '@react-google-maps/api';
import MainMap from '../components/pages/MainMap';

export default class MapServices {

    constructor() {

    }

    getLocation(originString) {

        // https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        return axios.get(proxyurl + 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?', {
            params: {
                input: `${originString}`,
                inputtype: "textquery",
                fields: "name,geometry",
                key: `AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g`
            }
        })
            .then(res => res.data.candidates[0].geometry.location)
            .then(res => this.setState({ originLatLng: `${res.lat},${res.lng}` }))
            .then(res => console.log("aquí llevas las coordenadas", this.state.originLatLng))
            .catch(err => console.log("getLocation error:", err))

    }

    getWaypoints(origin, radius, types = "point_of_interest,tourist_attraction", keyword = "touristic") {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        return axios.get(proxyurl + 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
            params: {
                location: `${origin}`,
                radius: `${radius}`,
                type: `${types}`,
                keyword: `${keyword}`,
                key: `AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g`
            }
        })
            .then(res => res.data.results.slice(0, 3))
            .then(res => res.map(elem => elem.name))
            .then(nameArray => this.setState({ waypoints: nameArray }))
            .then(()=> console.log("coords llegan a state", this.state))
            .catch(err => console.log(err))
        // .then(res => console.log("heeeeee-heeeee", res, this.state))
    }


    setWaypoints(nameArray) {
        nameArray.map(elem => elem.name)

    }


    calculateRoute() {

    }
}

// const service = new MapServices()

// service.getWayPoints("adas", "asdasd")

// ?location=40.413864,-3.696601&radius=300&type=point_of_interest,tourist_attraction&keyword=touristic&key


// responseURL: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=%0840.4298197,-3.6736717&radius=500&type=point_of_interest,tourist_attraction&keyword=touristic&key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g"
// responseURL: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=500&radius=%0840.4298197,-3.6736717&type=point_of_interest,tourist_attraction&keyword=touristic&key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g"
// responseURL: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=40.4298197,-3.6736717&radius=500&type=point_of_interest,tourist_attraction&keyword=touristic&key=AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g"
