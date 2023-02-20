const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema (
    {
        start: {type: Date},
        end: {type: Date},
        title: {type: String},
    }
)

module.exports = mongoose.model('Appointment', appointmentSchema)


