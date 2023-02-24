const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema (
    {
        // user: {type: mongoose.Types.objectId, ref: "User"},
        // expert: {type: mongoose.Types.objectId, ref: "Expert"},
        start: {type: Date},
        end: {type: Date},
        title: {type: String},
        user_UserName : {type: String},
        expert_UserName : {type: String}
    }
)

module.exports = mongoose.model('Appointment', appointmentSchema)


// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const appointmentSchema = new Schema (
//     {
//         start: {
//             type: Date,
//             validate: {
//                 validator: function (value) {
//                     return value >= new Date();
//                 },
//                 message: 'Cannot book appointment in the past'
//             }
//         },
//         end: {
//             type: Date,
//             validate: {
//                 validator: function (value) {
//                     return value >= this.start;
//                 },
//                 message: 'End time must be after start time'
//             }
//         },
//         title: {type: String},
//     }
// )

// module.exports = mongoose.model('Appointment', appointmentSchema)
