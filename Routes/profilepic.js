const express = require("express");
const {
  createProfilePic,
} = require("../CallbackFunctions/profilePicCallbackFunction");
// const { verifyToken } = require("../middlewares/verifyToken");

const profilepicRouter = express.Router();

profilepicRouter.put("/addprofilepic/:name", createProfilePic);

module.exports = profilepicRouter;
