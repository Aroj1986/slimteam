const express = require("express");
const slimTeamRouter = express.Router();
const {
  createExpert,
  getExperts,
  getExpert,
  addExpertExperience,
  createProfile,
  getExpertwithEmail,
  editExpertExperience,
  deleteExpertExperienceOne,
  deleteExpertEducationOne,
  deleteExpertCertificationOne,
  deleteExpertLanguageOne,
} = require("../CallbackFunctions/SlimTeamCallbackFunctions");
slimTeamRouter.route('/explore-experts').post(createProfile).post(createExpert).get(getExperts)
slimTeamRouter.route('/explore-expert/:name').get(getExpert)
slimTeamRouter.route('/explore-experts/:email').get(getExpertwithEmail)
slimTeamRouter
  .route("/portfolio/:name")
  .put(editExpertExperience)
  .get(getExpert);
slimTeamRouter
  .route("/portfolio/:name/delete-experience")
  .put(deleteExpertExperienceOne);
slimTeamRouter
  .route("/portfolio/:name/delete-education")
  .put(deleteExpertEducationOne);
slimTeamRouter
  .route("/portfolio/:name/delete-certification")
  .put(deleteExpertCertificationOne);
slimTeamRouter
  .route("/portfolio/:name/delete-language")
  .put(deleteExpertLanguageOne);

module.exports = slimTeamRouter;
