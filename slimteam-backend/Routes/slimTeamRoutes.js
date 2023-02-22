const express = require("express");
const slimTeamRouter = express.Router();
const {
  createExpert,
  getExperts,
  getExpert,
  addExpertExperience,
  editExpertExperience,
  deleteExpertExperienceOne,
  deleteExpertEducationOne,
  deleteExpertCertificationOne,
  deleteExpertLanguageOne,
} = require("../CallbackFunctions/SlimTeamCallbackFunctions");

slimTeamRouter.route("/explore-experts").post(createExpert).get(getExperts);
// slimTeamRouter.route('/explore-experts/:name').post(addExpertExperience).put(editExpertExperience)
// slimTeamRouter.route('/explore-experts/:name').get(getExpert)
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
