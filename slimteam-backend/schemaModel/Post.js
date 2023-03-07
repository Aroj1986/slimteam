const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};