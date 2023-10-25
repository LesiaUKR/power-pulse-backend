const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const diaryProductSchema = new Schema(
  {
    productId: {
      type: String,
      ref: 'product',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    date: {
      type: String,
      match: /^\d{2}\.\d{2}\.\d{4}$/,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 1,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { versionKey: false}
);

diaryProductSchema.post('save', handleMongooseError);

const diaryProductJoiSchema = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string().regex(/^\d{2}\.\d{2}\.\d{4}$/),
  calories: Joi.number().min(1).required(),
  amount: Joi.number().min(1).required(),
});

const delProductSchema = Joi.object({
  productId: Joi.string().alphanum().required(),
  date: Joi.string().regex(/^\d{2}\.\d{2}\.\d{4}$/).required(),
})

const schemas = {
  diaryProductJoiSchema,
  delProductSchema
};

const DiaryProducts = model('diaryproduct', diaryProductSchema);

module.exports = { DiaryProducts, schemas };

