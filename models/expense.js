
const { Schema, model } = require('mongoose');
const Joi = require('joi');

// const codeRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const expenseSchema = Schema({
  date: {
    type: String,
    required: [true, 'Select date'],
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  sum: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  date: Joi.string(),
  type: Joi.string().required(),
  category: Joi.string(),
  description: Joi.string(),
  sum: Joi.number().positive(),
  amount: Joi.number(),
});

const Expense = model('expense', expenseSchema);

module.exports = {
  Expense,
  joiSchema,
};
