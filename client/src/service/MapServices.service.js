import axios from 'axios'
import { DirectionsService } from '@react-google-maps/api';
import MainMap from '../components/pages/MainMap';
import mapStyles1 from "../styles/mapStyles1"
import mapStyles2 from "../styles/mapStyles2"
import mapStyles3 from "../styles/mapStyles3"
import mapStyles4 from "../styles/mapStyles4"
import ExperienceForm from '../components/pages/ExperienceForm';

export default class MapServices {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:3000/map',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }
    postExperience = experience => this._service.post('/new', experience)   //NO ESTOY TOTALMENTE SEGURO

    checkRadius(e) {
        const prueba = e.target.value
        console.log("soy el console", prueba, e.target)
        this.setState({ radius: prueba })
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
            .then(() => console.log("aquí llevas las coordenadas", this.state.originLatLng))
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
            .then(res => {
                console.log(res, "primer then")
                console.log("primeros 3 results", res.data.results.slice(0, 3))
                return res.data.results.slice(0, 3)
            })
            .then(res => res.map(elem => elem.name))
            .then(nameArray => this.setState({ waypoints: nameArray }))
            .then(() => console.log("coords llegan a state", this.state))
            .catch(err => console.log(err))
        // .then(res => console.log("heeeeee-heeeee", res, this.state))
    }


    setWaypoints(nameArray) {
        nameArray.map(elem => elem.name)

    }

    saveMap(mapState) {
        const { response, origin, waypoints, loggedInUser, description } = mapState
        console.log("aquí, pasando info", mapState)
        return axios.post("http://localhost:3000/map/new", { response, origin, waypoints, loggedInUser, description })
    }

    getMaps() {
        return axios.get("http://localhost:3000/map/allMaps")
    }
}
