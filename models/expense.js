
const { Schema, model } = require('mongoose');
const Joi = require('joi');

// const codeRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const expenseSchema = Schema({
  date: {
    type: Date,
    required: [true, 'Select date'],
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Select category'],
  },
  description: {
    type: String,
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
  date: Joi.date().min('now'),
  type: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string(),
  sum: Joi.number().positive(),
  amount: Joi.number,
});

const Expense = model('expense', expenseSchema);

module.exports = {
  Expense,
  joiSchema,
};
