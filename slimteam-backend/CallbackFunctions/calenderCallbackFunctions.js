const mongoose = require('mongoose')
const Appointment = require('../schemaModel/Calender')
const Profile = require('../schemaModel/Profile')

const createAppointment = async (req, res) => {
    const { start, end, title,UserName,expertName,allDay } = req.body
    try {
        const appointment = await Appointment.create({start: start, end: end, title: title, user_UserName:UserName, expert_UserName:expertName,allDay:allDay});
        res.status(201).json(appointment)
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const getAppointments = async (req, res) => {
    try {
        const {name,expertName} = req.params;
        const appointments = await Appointment.find({
            $and: [
            {user_UserName:name} , {expert_UserName:expertName}]})
        res.status(201).json(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const {name,expertName} = req.params;
        const appointments = await Appointment.find({})
        res.status(201).json(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getBookingInfo = async (req, res) => {
    try {
        const {name} = req.params;
        const appointments = await Appointment.find({user_UserName :name})
        res.status(201).json(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getexpertBookingInfo = async (req, res) => {
    try {
        const {name} = req.params;
        const appointments = await Appointment.find({expert_UserName :name})
        res.status(201).json(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getDetailsUserExpert = async (req, res) => {
    try {
        const {name,expertName} = req.params;
        const details = await Profile.find({"personal_details.first_name" :{
            $in :
           [name]}})
        res.status(201).json(details);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const getAppointment = async (req, res) => {
    const { title } = req.params
    try {
        const appointment = await Appointment.find({title})
        res.status(201).json(appointment)
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message)

    }
};



const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
    const appointment = await Appointment.findByIdAndUpdate(id, { $set: { title } }, { new: true });
    res.json(appointment)
    } catch (error) {
    res.status(500).send(error.message);
    }
  };


  const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByIdAndDelete(id);
      res.json({_id : id});
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error.message)
    }
  };


module.exports = {createAppointment, getAppointments,getBookingInfo,getexpertBookingInfo,getAllAppointments, getAppointment, updateAppointment, deleteAppointment,getDetailsUserExpert}