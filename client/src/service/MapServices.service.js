import axios from 'axios'

export default class MapServices {

    constructor() {
        

    }



    getWaypoints(origin="calle_alcala", radius="500", types = "point_of_interest,tourist_attraction", keyword = "touristic") {
        return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
            params: {
                location: `${origin}`,
                radius: `${radius}`,
                type: `${types}`,
                keyword: `${keyword}`,
                key: `AIzaSyCT9kMK6-ApyLtqRv5jMj2AE-0WOm7fW8g`
            }
        })

    }

    calculateRoute() {

    }
}

// const service = new MapServices()

// service.getWayPoints("adas", "asdasd")


// ?location=40.413864,-3.696601&radius=300&type=point_of_interest,tourist_attraction&keyword=touristic&key


