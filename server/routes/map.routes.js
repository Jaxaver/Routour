const express = require('express')
const router = express.Router()
const Experience = require('../models/Experience.model')


router.get('/allMaps', (req, res) => {
    Experience.find()
        .then(allExperiences => res.json(allExperiences))
        .catch(err => console.log('DB error', err))

})


router.post('/new', (req, res) => {
    const { response, origin, waypoints, loggedInUser, description } = req.body
    console.log(req.body)
    Experience.create(
        {
            user: loggedInUser.username,
            description: req.body.description,
            mapState: {
                response: response,
                origin: origin,
                waypoints: waypoints,
            }
        }
    )
        .then(theNewExperience => res.json(theNewExperience))
        .catch(err => console.log('DB error: ', err))
})

// router.


module.exports = router