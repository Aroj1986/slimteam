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
  

const deletePostOne = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const post = await Post.findByIdAndDelete(
      { "_id": id},
    );
    res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

module.exports = { 
    createPost,
    getPosts,
    deletePostOne,
};
