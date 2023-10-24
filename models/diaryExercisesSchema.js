const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const diaryExerciseSchema = new Schema(
  {
   	exerciseId: {
			type: String,
			ref: 'exercise',
			required: true,
   	},
		owner: {
      	type: Schema.Types.ObjectId,
			required: true,
   	},
   	date: {
      type: String,
      match: /^\d{2}\/\d{2}\/\d{4}$/i,
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
   	},
		bodyPart: {
		type: String,
	   required: true,
		},
		equipment: {
		type: String,
	   required: true,
		},
		name: {
		type: String,
		required: true,
		},
		target: {
		type: String,
		required: true,
		}
	
  },
  { versionKey: false, timestamps: true }
);

diaryExerciseSchema.post('save', handleMongooseError);

const diaryAddExerciseSchema = Joi.object({
  exerciseId: Joi.string().required(),
  date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/i).required(),
  time: Joi.number().min(1).required(),
  burnedCalories: Joi.number().min(1),
  bodyPart: Joi.string(),
  equipment: Joi.string(),
  name: Joi.string(),
  target: Joi.string(),
});

const diaryDelExerciseSchema = Joi.object({
  id: Joi.string().alphanum().required(),
})

const schemas = {
	diaryAddExerciseSchema,
	diaryDelExerciseSchema,
};

const diaryExercise = model('diaryexercise', diaryExerciseSchema);

module.exports = {
  diaryExercise,
  schemas,
};
