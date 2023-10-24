const { Schema, model } = require("mongoose");
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');


const diarySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  burnedCalories: {
    type: Number,
  },
  consumedCalories: {
    type: Number,
  },
  doneExercisesTime: {
    type: Number,
  },
  products: [
    {
      weight: {
        type: Number,
      },
      calories: {
        type: Number,
      },
      category: {
        type: String,
      },
      title: {
        type: String,
      },
      amount: {
        type: Number,
      },
      recommend: {
        type: Boolean,
      },
    },
  ],
  exercises: [
    {
      bodyPart: {
        type: String,
      },
      equipment: {
        type: String,
      },
      name: {
        type: String,
      },
      target: {
        type: String,
      },
      burnedCalories: {
        type: Number,
      },
      time: {
        type: Number,
      },
    },
  ],
}, { versionKey: false, timestamps: true });

diarySchema.post('save', handleMongooseError);

const Diary = model('diary', diarySchema);

const productSchema = Joi.object({
    productID: Joi.string().required(),
    date: Joi.string().pattern(/^(\d{2}\/\d{2}\/\d{4})$/).required(),
    amount: Joi.number().min(1).required(),
    calories: Joi.number().min(1).required(),
  });
  
  const exerciseSchema = Joi.object({
    exerciseID: Joi.string().required(),
    date: Joi.string().pattern(/^(\d{2}\/\d{2}\/\d{4})$/).required(),
    time: Joi.number().min(1).required(),
    calories: Joi.number().min(1).required(),
  });
  
  const schemas = {
    productSchema,
    exerciseSchema,
  };
  
 
  module.exports = {Diary, schemas };