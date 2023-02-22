const mongoose = require('mongoose')
const Profile = require('../schemaModel/Profile')

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
        const {personal_details} = req.body
        const expert = await Profile.create({personal_details})
        res.status(201).json(expert)
    } catch (error) {
        console.log(error.messages)
        res.status(500).send(error.messages);
    }
}

// const UpdateProfilePic = async (req, res) => {
//     try {
//         const {name} = req.params
//         // const {profile_picture} = req.file.filename
//         console.log(profile_picture)
//         const expert = await Profile.findOneAndUpdate({"personal_details.first_name" : name},{profile_picture},{new:true})
//         res.status(201).json(expert)
//     } catch (error) {
//         console.log(error.messages)
//         res.status(500).send(error.messages);
//     }
// }


const createExpert = async (req, res) => {
    try {
        const {personal_details} = req.body
        console.log(personal_details)
        const expert = await Profile.find()
        // create({personal_details})
        res.status(201).json(expert)
    } catch (error) {
        console.log(error.messages)
        res.status(500).send(error.messages);
    }
}

const editExpertExperience = async (req, res) => {
    try {
        const {name} = req.params;
        const {experience,education,certifications,languages} = req.body
        // const {education} = req.body
        const expert = await Profile.findOneAndUpdate({"personal_details.first_name" : name},{$push : {experience,education,certifications,languages}},{new:true})
        res.status(201).json(expert)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.messages);
    }
}

const addExpertExperience = async (req, res) => {
    try {
        const {experience} = req.body
        console.log(experience)
        const expertExperience = await Profile.create({experience})
        res.status(201).json(expertExperience)
    } catch (error) {
        console.log(error.messages)
        res.status(500).send(error.messages);
    }
}

const getExperts = async (req, res) => {
    try {
        const expert = await Profile.find()
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

const getExpert = async (req, res) => {
    const {name} = req.params
    try {
        const expert = await Profile.findOne({"personal_details.first_name": name})
        res.status(201).json(expert)
    } catch (error) {
        res.status(500).send(error.messages);
    }
}

const getExpertwithEmail = async (req, res) => {
    const {email} = req.params
    try {
        const expert = await Profile.find({"personal_details.email": email})
        res.status(201).json(expert)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.messages);
    }
}

module.exports = {createExpert,createProfile,addExpertExperience, editExpertExperience,getExperts, getExpert,getExpertwithEmail}