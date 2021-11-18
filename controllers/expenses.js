const { NotFound } = require('http-errors');

const { Expense } = require('../models');

const listExpenses = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const expenses = await Expense.find({ owner: _id }, '_id date type category description sum', { skip, limit: +limit }).populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      expenses
    }
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await Expense.findOne({ owner: _id, _id: contactId }, '_id name email phone favorite').populate('owner', 'email');
  if (!contact) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    contact
  });
};

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Expense.create(newContact);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Expense.findOneAndRemove({ owner: _id, _id: contactId });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted'
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Expense.findOneAndUpdate({ owner: _id, _id: contactId }, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

// const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const { favorite } = req.body;
//   const { _id } = req.user;

//   if (typeof favorite === 'undefined') {
//     throw new BadRequest('missing field favorite');
//   }
//   const result = await Expense.findOneAndUpdate({ owner: _id, _id: contactId }, { favorite }, { new: true });
//   if (!result) {
//     throw new NotFound(`Product with id ${contactId} not found`)
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result
//     }
//   });
// };

module.exports = {
  listExpenses,
  getContactById,
  addContact,
  removeContact,
  updateById,
  // updateStatusContact,
};
