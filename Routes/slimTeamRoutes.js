const express = require("express");
const slimTeamRouter = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  // createExpert,
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
  editExpertExperienceOne,
  editExpertEducationOne,
  editExpertCertificationOne,
  editExpertHeadline,
  editExpertHeadlineExpert,
  getProfile,
  editLanguages,
} = require("../CallbackFunctions/slimTeamCallbackFunctions");

slimTeamRouter.get("/profile", verifyToken, getProfile);
slimTeamRouter.route("/explore-experts").post(createProfile).get(getExperts);
slimTeamRouter.route("/explore-expert/:name").get(getExpert);
slimTeamRouter.route("/explore-experts/:email").get(getExpertwithEmail);
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
slimTeamRouter
  .route("/portfolio/:name/edit-experience/:id")
  .put(editExpertExperienceOne);
slimTeamRouter
  .route("/portfolio/:name/edit-education/:id")
  .put(editExpertEducationOne);
slimTeamRouter
  .route("/portfolio/:name/edit-certification/:id")
  .put(editExpertCertificationOne);
slimTeamRouter.route("/portfolio/:name/edit-languages/:id").put(editLanguages);
slimTeamRouter
  .route("/portfolio/:name/edit-headline/:id")
  .put(editExpertHeadline)
slimTeamRouter
  .route("/portfolio/:name/edit-headline-expert/:id")
  .put(editExpertHeadlineExpert);

module.exports = slimTeamRouter;
