const express = require('express')
const router = express.Router()
const Experience = require('../models/Experience.model')


router.get('/', (req, res) => {
    Experience.find()
        .then(allExperiences => res.json(allExperiences))
        .catch(err => console.log('DB error', err))

})

router.post('/new', (req, res) => {
    const { response, origin, waypoints, type, keyword } = req.body
    console.log(typeof response)

    Experience.create(
        {
            user: "",
            description: "",
            mapState: {
                response: response,
                origin: origin,
                waypoints: waypoints,
                type: type,
                keyword: keyword
            }
        }
    )
        .then(theNewExperience => res.json(theNewExperience))
        .catch(err => console.log('DB error: ', err))
})


module.exports = router