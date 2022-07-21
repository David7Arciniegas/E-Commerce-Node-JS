const express = require('express');

// Controllers
const {
	getAllOrders,
	createUser,
	getOrdersById,
	updateUser,
	deleteUser,
	login,
} = require('../controllers/users.controller');

// Middlewares
const {
	createUserValidators,
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', createLoginValidator, login);

usersRouter.use(protectSession);

usersRouter.get('/me', getAllProducts);

usersRouter
	.use('/:id', userExists)
	.route('/:id')
	.get('/orders/:id', getOrdersById, userExists)
	.get('/orders', getAllOrders, userExists)
	.patch('/:id', protectUserAccount, updateUser)
	.delete('/:id', protectUserAccount, deleteUser);

module.exports = { usersRouter };
