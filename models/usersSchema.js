const { default: mongoose } = require("mongoose");
const EMAIL_REGEX = require("../helpers/constants");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: EMAIL_REGEX,
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        min: 6,
    },
    token: String,
    avatarUrl: {
        type: String,
        default: '',
    },
    bodyParams: {
        height: {
            type: Number,
            default: 0,
            
        },
        currentWeight: {
            type: Number,
            default: 0,
            
        },
        desiredWeight: {
            type: Number,
            default: 0,
            
        },
        birthday: {
            type: Date,
            default: 0,
            
        },
        blood: {
            type: Number,
            default: 0,
           
        },
        sex: {
            type: String,
            default: '',
            
        },
        levelActivity: {
            type: Number,
            default: 0,
            
        },
        dailyIntakeCalories: {
            type: Number,
            default: 0,
            
        },
        dailyNormOfSport: {
            type: Number,
            default: 110,
            
        }
    }
}, { versionKey: false, timestamps: true })

module.exports = UserSchema;