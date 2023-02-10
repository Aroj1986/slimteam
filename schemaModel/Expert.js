const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expertSchema = new Schema (
    {
        first_name: {type: String},
        last_name: {type: String},
        expertise: {type: String},
    }
)

module.exports = mongoose.model('Expert', expertSchema)