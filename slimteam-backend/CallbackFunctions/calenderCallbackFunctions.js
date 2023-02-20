const mongoose = require('mongoose')
const Appointment = require('../schemaModel/Calender')

const createAppointment = async (req, res) => {
    const { start, end, title } = req.body
    try {
        const appointment = await Appointment.create({start: start, end: end, title: title});
        res.status(201).json(appointment)
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
        res.status(201).json(appointments);
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


module.exports = {createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment}