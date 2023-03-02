const mongoose = require('mongoose')
const Schema = mongoose.Schema

// if we want to send multiple values then we need to wrap the value with Square-brackets []
// Type : Date will take the values in the format - YYYY/MM/DD

const profileSchema = new Schema (
    {
        role : {type : String},
        personal_details : {
            email : {type: String},
            skills : [{type: String}],
            profile_picture : {type: String,
            default:"https://res.cloudinary.com/daeqbf45h/image/upload/v1677080995/rnjmgtg2gn6dse1oyseg.jpg" },
            title : {type : String, required: true},
            first_name : {type : String, required: true},
            last_name : {type : String, required: true},
            address : {
                street : {type : String, required: true},
                // h_no : {type : Number},
                postal_code : {type : String, required: true},
                city : {type : String, required: true},
            },
            nationality : {type : String, required: true},
            dob :  {type : Date},
            phone_number : {type : String, required: true},
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
            valid_from : {type : Date},
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