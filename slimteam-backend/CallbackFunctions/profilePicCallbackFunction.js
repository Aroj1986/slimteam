const cloudinary = require("cloudinary").v2;

const  Profile  = require("../schemaModel/Profile");

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const createProfilePic = async (req, res,next) => {
  try {
    const {profile_picture} = req.body;
    const {name} = req.params;
    const result = await cloudinary.uploader.unsigned_upload(profile_picture, "ju7lk0iu");
    const expert = await Profile.findOneAndUpdate(
        { "personal_details.first_name" : name },
        { $set : {
        "personal_details.profile_picture" : result.secure_url,
    }}
    )

res.status(201).json(expert)

  } catch (error) {
    console.log(`here : ${error.message}`);
    next(error);
  }
};

module.exports = {
    createProfilePic,
};
