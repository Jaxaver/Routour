import axios from 'axios'

export default class CalculateRoutes{

    constructor() {
        
    }



    getWayPoints(origin, radius, types, keyword = "touristic", apiKey){
        axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
            params: {
                location: `${origin}`,
                radius: `${radius}`,
                type: `${types}`,
                keyword: `${keyword}`,
                key: `${apiKey}`                
            }
    })

    }
    
    calculateRoute() {

    }
}

// const service = new CalculateRoutes()

// service.getWayPoints("adas", "asdasd")


// ?location=40.413864,-3.696601&radius=300&type=point_of_interest,tourist_attraction&keyword=touristic&key


