
const { Schema, model } = require('mongoose');
const Joi = require('joi');

// const codeRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const expenseSchema = Schema({
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
  amount: Joi.number,
});

const Expense = model('expense', expenseSchema);

module.exports = {
  Expense,
  joiSchema,
};
