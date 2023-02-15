const mongoose = require('mongoose')
const Profile = require('../schemaModel/Profile')



const createExpert = async (req, res) => {
    try {
        const {personal_details,experience,education,certifications,languages,hourly_rate} = req.body
        const expert = await Profile.create({personal_details,experience,education,certifications,languages,hourly_rate})
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

const getExperts = async (req, res) => {
    try {
        const expert = await Profile.find()
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

const getExpert = async (req, res) => {
    const {name} = req.params
    try {
        const expert = await Profile.findOne({first_name: name})
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

module.exports = {createExpert, getExperts, getExpert}