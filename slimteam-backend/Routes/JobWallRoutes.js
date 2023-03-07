const express = require('express')
const jobWallRouter = express.Router()
const {createPost, getPosts, deletePostOne} = require('../CallbackFunctions/JobWallCallbackFunctions')
const { verifyToken } = require("../middlewares/verifyToken");

jobWallRouter.post('/', createPost)
jobWallRouter.get('/', getPosts)
jobWallRouter.route('/delete-post/:id').put(deletePostOne)

module.exports = jobWallRouter