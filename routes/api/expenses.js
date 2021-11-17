const express = require('express')

const { controllerWrapper, validation, authenticate } = require('../../middlewares');
const { joiSchema } = require('../../models/expense');
const { expenses: ctrl } = require('../../controllers');

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContact))

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateStatusContact))

module.exports = router
