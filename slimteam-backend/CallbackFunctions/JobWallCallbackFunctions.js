const mongoose = require("mongoose");
const Post = require("../schemaModel/Post");
const { ErrorResponse } = require("../utilities/ErrorResponse");

const createPost = async (req, res, next) => {
  try {
    const { title, description} = req.body;
    const newPost = await Post.create({ title, description });
    res.send(newPost)
} catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ });
    res.json(posts)
} catch (error) {
    next(error);
  }
};
  
module.exports = { 
    createPost,
    getPosts,
};
