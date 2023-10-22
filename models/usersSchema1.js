const { default: mongoose } = require("mongoose");
const EMAIL_REGEX = require("../helpers/constants");
const Joi = require('joi')

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
            required: [true, 'Height is required'],
            min: [150, "Height should be more than 150"]
        },
        currentWeight: {
            type: Number,
            required: [true, 'Weight is required'],
            min: [35, "Current weight should be more than 35"]
        },
        desiredWeight: {
            type: Number,
            required: [true, "Desired weight is required"],
            min: [35, "Desired weight should be more than 35"]
        },
        birthday: {
            type: Date,
            required: [true, "Birthday is required"],
        },
        blood: {
            type: Number,
            enum: [1, 2, 3, 4],
            required: [true, "Blood type is required"]
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: [true, "Sex field is required"]
        },
        levelActivity: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: [true, "Activity level is required"]
        }
    }
}, { versionKey: false, timestamps: true })

const bodyParamsSchema = Joi.object({
    height: Joi.number().min(150).required(),
    currentWeight: Joi.number().min(35).required(),
    desiredWeight: Joi.number().min(35).required(),
    birthday: Joi.date().less('now').iso().custom((value, helpers) => {
        const age = (new Date() - value) / (1000 * 60 * 60 * 24 * 365.25);
        if (age < 18) {
            return helpers.error('The person must be at least 18 years old.');
        }
        return value;
    }).required(),
    blood: Joi.number().valid(1, 2, 3, 4).required(),
    sex: Joi.string().valid("male", "female").required(),
    levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required()
})

const schemas = { bodyParamsSchema }

module.exports = {UserSchema, schemas};