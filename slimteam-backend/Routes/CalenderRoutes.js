const express = require('express')
const CalenderRoutes = express.Router()
const {createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment} = require('../CallbackFunctions/CalenderCallbackFunctions')


CalenderRoutes.route('/book-online/:title').post(createAppointment).get(getAppointment).delete(deleteAppointment)
CalenderRoutes.route('/book-online').get(getAppointments)



// CalenderRoutes.route('/book-online/name/:name').get(getAppointment)


module.exports = CalenderRoutes;