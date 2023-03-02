const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, select: false, required: true},
    isExpert: {type: Boolean, required: true},
    isUser: {type: Boolean, required: true}
    // first_name: {type: String, required: true}
})

module.exports = mongoose.model('User', UserSchema)