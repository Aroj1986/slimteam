const mongoose = require('mongoose')
const Schema = mongoose.Schema

// if we want to send multiple values then we need to wrap the value with Square-brackets []
// Type : Date will take the values in the format - YYYY/MM/DD

const profileSchema = new Schema (
    {
        id : {type : Number},
        personal_details : {
            email : {type: String},
            skills : [{type: String}],
            profile_picture : {type: String },
            title : {type : String},
            first_name : {type : String},
            last_name : {type : String},
            address : {
                street : {type : String},
                h_no : {type : Number},
                postal_code : {type : Number},
                city : {type : String},
            },
            nationality : {type : String},
            dob :  {type : Date},
            phone_number : {type : Number},
        },
       
        experience : [{
            id : {type : Number},
            institution : {type : String},
            position : {type : String},
            from_date : {type : Date},
            until_date : {type : Date},
        }],
        education : [{
            id : {type : Number},
            institute : {type : String},
            degree : {type : String},
            start_date :  {type : Date},
            end_date :  {type : Date},
        }],

        certifications : [{
            id : {type : Number},
            certification_name : {type : String},
        }],

        languages : [{
            id : {type : Number},
            language : {type : String},
            proficiency : {type : String}
        }],

        hourly_rate : {type: Number},
      
    }
)

module.exports = mongoose.model('Profile', profileSchema)