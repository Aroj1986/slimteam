const express = require('express')
const CalenderRoutes = express.Router()
const {createAppointment,getAppointments,getBookingInfo,getexpertBookingInfo,getAllAppointments, getAppointment, updateAppointment, deleteAppointment,getDetailsUserExpert} = require('../CallbackFunctions/CalenderCallbackFunctions')


CalenderRoutes.route('/book-online/:id').get(getAppointment).delete(deleteAppointment).put(updateAppointment)
CalenderRoutes.route('/book-online').post(createAppointment).get(getAllAppointments)
CalenderRoutes.route('/book-online/:name/:expertName').get(getAppointments)
CalenderRoutes.route('/profile-details/:name').get(getDetailsUserExpert)
CalenderRoutes.route('/managebookings/:name').get(getBookingInfo)
CalenderRoutes.route('/manageexpertbookings/:name').get(getexpertBookingInfo)

// CalenderRoutes.route('/book-online/name/:name').get(getAppointment)


module.exports = CalenderRoutes;