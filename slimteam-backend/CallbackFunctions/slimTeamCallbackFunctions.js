const mongoose = require('mongoose')
const Expert = require('../schemaModel/Expert')

const createExpert = async (req, res) => {
    try {
        const {first_name, last_name, expertise} = req.body
        const expert = await Expert.create({first_name: first_name, last_name: last_name, expertise: expertise})
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

const getExperts = async (req, res) => {
    try {
        const expert = await Expert.find()
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

const getExpert = async (req, res) => {
    const {name} = req.params
    try {
        const expert = await Expert.findOne({first_name: name})
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

module.exports = {createExpert, getExperts, getExpert}