const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const diaryExerciseSchema = new Schema({
	exerciseId: {
		type: String,
		ref: 'exercise',
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'user'
	},
	date: {
		type: String,
		match: /^\d{2}\/\d{2}\/\d{4}$/,
		required: true,
	},
	time: {
		type: Number,
		min: 1,
		required: true,
	},
	burnedCalories: {
		type: Number,
		min: 1,
	}

}, { versionKey: false });

diaryExerciseSchema.post('save', handleMongooseError);

const diaryExerciseJoiSchema = Joi.object({
	exerciseId: Joi.string().required(),
	time: Joi.number().min(1).required(),
	burnedCalories: Joi.number().min(1)
});

const delExerciseSchema = Joi.object({
	exerciseId: Joi.string().alphanum().required(),
	date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
		"string.pattern.base": "The date must be in format DD/MM/YYYY"
	}),
})

const schemas = {
	diaryExerciseJoiSchema,
	delExerciseSchema,
};

const DiaryExercises = model('diaryexercise', diaryExerciseSchema);

module.exports = {
	DiaryExercises,
	schemas,
};
