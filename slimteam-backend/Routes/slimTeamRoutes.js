const express = require('express')
const slimTeamRouter = express.Router()
const {createExpert, getExperts, getExpert} = require('../CallbackFunctions/SlimTeamCallbackFunctions')

slimTeamRouter.route('/explore-experts').post(createExpert).get(getExperts)
slimTeamRouter.route('/explore-experts/:name').get(getExpert)

module.exports = slimTeamRouter