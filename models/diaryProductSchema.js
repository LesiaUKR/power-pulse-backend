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
    },
    date: {
      type: String,
      match: /^\d{2}\/\d{2}\/\d{4}$/i,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    recommended: {
      type: Boolean,
      default: true,
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
    weight: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { versionKey: false, timestamps: true }
);

diaryProductSchema.post('save', handleMongooseError);

const productSchema = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/i).required(),
  calories: Joi.number().min(1).required(),
  category: Joi.string().required(),
  recommended: Joi.boolean().required(),
  title: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  weight: Joi.number().min(1).required(),
});

const delProductSchema = Joi.object({
  id: Joi.string().required(),
});

const schemasProduct = {
	productSchema,
	delProductSchema
};

const diaryProduct = model('diaryproduct', diaryProductSchema);

module.exports = { diaryProduct, schemasProduct };

