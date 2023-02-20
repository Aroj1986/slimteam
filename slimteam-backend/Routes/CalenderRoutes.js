const express = require('express')
const CalenderRoutes = express.Router()
const {createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment} = require('../CallbackFunctions/CalenderCallbackFunctions')


CalenderRoutes.route('/book-online/:id').get(getAppointment).delete(deleteAppointment).put(updateAppointment)
CalenderRoutes.route('/book-online').get(getAppointments).post(createAppointment)



// CalenderRoutes.route('/book-online/name/:name').get(getAppointment)


module.exports = CalenderRoutes;