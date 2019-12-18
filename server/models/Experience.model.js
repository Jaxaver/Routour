const mongoose = require('mongoose')
const Schema = mongoose.Schema

const experienceSchema = new Schema({
    user: String,
    description: String,

    mapState: {
        response: {},
        origin: String,
        waypoints: [],
        type: { type: String },
        keyword: String
    }
}, {
    timestamps: true
})


const ExperienceModel = mongoose.model('Experience', experienceSchema)
module.exports = ExperienceModel