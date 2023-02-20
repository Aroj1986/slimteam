const express = require('express')
const slimTeamRouter = express.Router()
const {createExpert,addExpertExperience, editExpertExperience,getExperts, getExpert} = require('../CallbackFunctions/SlimTeamCallbackFunctions')

slimTeamRouter.route('/explore-experts').post(createExpert).get(getExperts)
// slimTeamRouter.route('/explore-experts/:name').post(addExpertExperience).put(editExpertExperience)
// slimTeamRouter.route('/explore-experts/:name').get(getExpert)
slimTeamRouter.route('/portfolio/:name').put(editExpertExperience).get(getExpert)

module.exports = slimTeamRouter