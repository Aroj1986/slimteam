const mongoose = require("mongoose");
const Profile = require("../schemaModel/Profile");

// const createProfile = async (req, res) => {
//     try {
//         const {personal_details,experience,education,certifications,languages,hourly_rate} = req.body
//         const expert = await Profile.create({personal_details,experience,education,certifications,languages,hourly_rate})
//         res.status(201).json(expert)
//     } catch (error) {
//         console.log(error.messages)
//         res.status(500).send(error.messages);
//     }
// }
const createProfile = async (req, res) => {
    try {
        const {personal_details,role} = req.body
        const expert = await Profile.create({personal_details,role})
        res.status(201).json(expert)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.messages);
    }
}

// const createExpert = async (req, res) => {
//   try {
//     const { personal_details } = req.body;
//     console.log(personal_details);
//     const expert = await Profile.find();
//     // create({personal_details})
//     res.status(201).json(expert);
//   } catch (error) {
//     console.log(error.messages);
//     res.status(500).send(error.messages);
//   }
// };

const editExpertExperience = async (req, res) => {
  try {
    const { name } = req.params;
    const { experience, education, certifications, languages } = req.body;
    // const {education} = req.body
    const expert = await Profile.findOneAndUpdate(
      { "personal_details.first_name": name },
      { $push: { experience, education, certifications, languages } },
      { new: true }
    );
    res.status(201).json(expert);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};
const getExperts = async (req, res) => {
  try {
    const expert = await Profile.find();
    res.status(201).json(expert);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const addExpertExperience = async (req, res) => {
  try {
    const { experience } = req.body;
    console.log(experience);
    const expertExperience = await Profile.create({ experience });
    res.status(201).json(expertExperience);
  } catch (error) {
    console.log(error.messages);
    res.status(500).send(error.messages);
  }
};
const getExpert = async (req, res) => {
  const { name } = req.params;
  try {
    const expert = await Profile.findOne({
      "personal_details.first_name": name,
    });
    res.status(201).json(expert);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const getExpertwithEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const expert = await Profile.find({ "personal_details.email": email });
    res.status(201).json(expert);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const deleteExpertExperienceOne = async (req, res) => {
  try {
    const { name } = req.params;
    const  {experience}  = req.body;
    const expert = await Profile.findOneAndUpdate(
      { "personal_details.first_name": name },
      { $pull: { experience } },
      { new: true }
    );
    res.status(201).json(expert);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const deleteExpertEducationOne = async (req, res) => {
  try {
    const { name } = req.params;
    const { education } = req.body;
    console.log(name, education);
    const expert = await Profile.findOneAndUpdate(
      { "personal_details.first_name": name },
      { $pull: { education } },
      { new: true }
    );
    res.status(201).json(expert);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const deleteExpertCertificationOne = async (req, res) => {
  try {
    const { name } = req.params;
    const { certifications } = req.body;
    console.log(name, certifications);
    const expert = await Profile.findOneAndUpdate(
      { "personal_details.first_name": name },
      { $pull: { certifications } },
      { new: true }
    );
    res.status(201).json(expert);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const deleteExpertLanguageOne = async (req, res) => {
  try {
    const { name } = req.params;
    const { languages } = req.body;
    console.log(name, languages);
    const expert = await Profile.findOneAndUpdate(
      { "personal_details.first_name": name },
      { $pull: { languages } },
      { new: true }
    );
    res.status(201).json(expert);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const editExpertExperienceOne = async (req, res) => {
  try {
    const { name, id } = req.params;
    const { experience } = req.body;
    console.log(name, experience, id);
    const expert = await Profile.findOne({ "experience._id": id });
    expert.experience = expert.experience.map((exp) => {
      if (exp._id.equals(id)) {
        return experience;
      } else {
        return exp;
      }
    });
    const result = await expert.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const editExpertEducationOne = async (req, res) => {
  try {
    const { name, id } = req.params;
    const { education } = req.body;
    console.log(name, education, id);
    const expert = await Profile.findOne({ "education._id": id });
    expert.education = expert.education.map((edu) => {
      if (edu._id.equals(id)) {
        return education;
      } else {
        return edu;
      }
    });
    const result = await expert.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const editExpertCertificationOne = async (req, res) => {
  try {
    const { name, id } = req.params;
    const { certifications } = req.body;
    console.log(name, certifications, id);
    const expert = await Profile.findOne({ "certifications._id": id });
    expert.certifications = expert.certifications.map((cert) => {
      if (cert._id.equals(id)) {
        return certifications;
      } else {
        return cert;
      }
    });
    const result = await expert.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};

const editLanguages = async (req, res) => {
  try {
    const { name, id } = req.params;
    const { languages } = req.body;
    const expert = await Profile.findOne({ "languages._id": id });
    expert.languages = expert.languages.map((lang) => {
      if (lang._id.equals(id)) {
        return languages;
      } else {
        return lang;
      }
    });
    const result = await expert.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};


const editExpertHeadline = async (req, res) => {
  try {
    const { name, id } = req.params;
    const { personal_details } = req.body;
    console.log(name, personal_details.first_name, personal_details);
    const expert = await Profile.findOneAndUpdate(
      { "personal_details.first_name": name },
      { $set: { 
        "personal_details.first_name": personal_details.first_name,
        "personal_details.last_name": personal_details.last_name,
        "personal_details.address.street": personal_details.address.street,
        "personal_details.address.city": personal_details.address.city,
        "personal_details.nationality": personal_details.nationality,
        "personal_details.email": personal_details.email,
        "personal_details.phone_number": personal_details.phone_number,
       } },
      { new: true }
    );
    res.status(201).json(expert);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.messages);
  }
};


const getProfile = async (req, res) => {
  try {
    const expert = await Profile.findOne({"personal_details.email":req.user.email
    });
    res.status(201).json(expert);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

module.exports = {
  // createExpert,
  createProfile,
  getExperts,
  getExpert,
  addExpertExperience,
  editExpertExperience,
  deleteExpertExperienceOne,
  deleteExpertEducationOne,
  deleteExpertCertificationOne,
  deleteExpertLanguageOne,
  getExpertwithEmail,
  editExpertExperienceOne,
  editExpertEducationOne,
  editExpertCertificationOne,
  editLanguages,
  editExpertHeadline,
  getProfile,
};
