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
            .then(res => res.data.candidates[0].geometry.location )
            .then(res => this.state.originLatLng =`${res.lat},${res.lng}`)
            .then(res => console.log("origen obtenido", res))
            .catch(err => console.log("getLocation error:", err))

    }

    getWaypoints(origin = "40.413864,-3.696601", radius, types = "point_of_interest,tourist_attraction", keyword = "touristic") {
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
            .then(nameArray => this.state.waypoints = nameArray)
            .then(console.log("waypoints obtenidos"))
        // .then(res => console.log("heeeeee-heeeee", res, this.state))

    }

    

    calculateRoute() {

    }
}

// const service = new MapServices()

// service.getWayPoints("adas", "asdasd")


// ?location=40.413864,-3.696601&radius=300&type=point_of_interest,tourist_attraction&keyword=touristic&key


