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
    avatarUrl: String,
    verify: {
        type: Boolean,
        default: false
      },
      verificationToken: {
        type: String,
        // required: [true, 'Verify token is required'],
        
      },
}, { versionKey: false, timestamps: true })

module.exports = UserSchema;