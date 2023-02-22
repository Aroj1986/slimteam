const express = require('express')
const slimTeamRouter = express.Router()
const {createExpert,addExpertExperience,createProfile, getExpertwithEmail,editExpertExperience,getExperts, getExpert} = require('../CallbackFunctions/SlimTeamCallbackFunctions')

slimTeamRouter.route('/explore-experts').post(createProfile).post(createExpert).get(getExperts)
// slimTeamRouter.route('/explore-experts/:name').post(addExpertExperience).put(editExpertExperience)
slimTeamRouter.route('/explore-expert/:name').get(getExpert)
slimTeamRouter.route('/portfolio/:name').put(editExpertExperience).get(getExpert)
slimTeamRouter.route('/explore-experts/:email').get(getExpertwithEmail)

module.exports = slimTeamRouter