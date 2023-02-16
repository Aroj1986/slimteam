const mongoose = require('mongoose')
const Appointment = require('../schemaModel/Calender')

const createAppointment = async (req, res) => {
    const { start, end, title } = req.body
    try {
        const appointment = await Appointment.create({start: start, end: end, title: title});
        res.status(201).json(appointment)
    } catch (error) {
        console.log(error.messages);
        res.status(500).send(error.messages);
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
        res.status(201).json(appointments);
    } catch (error) {
        res.status(500).send(error.messages);
    }
};


const getAppointment = async (req, res) => {
    const { title } = req.params
    try {
        const appointment = await Appointment.find({title})
        res.status(201).json(appointment)
    } catch (error) {
        res.status(500).send(error.messages);
        console.log(error.message)

    }
};



const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
    const appointment = await Appointment.findByIdAndUpdate(id, { $set: { body, title } });
    res.status(201).json(appointment)
    } catch (error) {
    res.status(500).send(error.messages);
    }
  };


  const deleteAppointment = async (req, res) => {
    const { title } = req.params;
    try {
      const appointment = await Appointment.deleteMany({title});
      res.json(appointment);
    } catch (error) {
      res.status(500).send(error.messages);
      console.log(error.message)
    }
  };


module.exports = {createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment}