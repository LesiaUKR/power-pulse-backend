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
    
}, { versionKey: false, timestamps: true })

module.exports = UserSchema;