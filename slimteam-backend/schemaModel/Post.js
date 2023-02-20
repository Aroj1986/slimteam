const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({
  title: {type: String},
  description: {type: String},
  author: {type: String},
  post_pic: {type: String},
  post_date: {type: Date},
  })

  module.exports = mongoose.model('Post', postSchema)

/*   ,
  {
    timestamps: true,
  } */