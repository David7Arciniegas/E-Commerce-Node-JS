// Models
const { Cart } = require('../models/carts.model');
const { Users } = require('../models/users.model');
const { Products } = require('../models/products.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createProduct = catchAsync(async (req, res, next) => {
	const { productId, quantity } = req.body;
	const { sessionUser } = req;

	const newProduct = await Products.create({
		productId: sessionUser.id,
		quantity,
		
	});

	res.status(201).json({
		status: 'success',
		newCart,
	});
});






const getAllComments = catchAsync(async (req, res, next) => {
	// Deep includes
	const comments = await Comment.findAll({
		attributes: ['id', 'comment'],
		include: [
			{ model: User, attributes: ['id', 'name', 'email'] },
			{
				model: Post,
				attributes: ['id', 'title', 'content'],
				include: [{ model: User, attributes: ['id', 'name', 'email'] }],
			},
		],
	});

	res.status(200).json({
		status: 'success',
		comments,
	});
});



const getCommentById = catchAsync(async (req, res, next) => {
	const { comment } = req;

	res.status(200).json({
		status: 'success',
		comment,
	});
});

const updateComment = catchAsync(async (req, res, next) => {
	const { comment } = req;
	const { newComment } = req.body;

	await comment.update({ comment: newComment });

	res.status(204).json({
		status: 'success',
	});
});

const deleteComment = catchAsync(async (req, res, next) => {
	const { comment } = req;

	await comment.update({ status: 'deleted' });

	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	getAllComments,
	createComment,
	getCommentById,
	updateComment,
	deleteComment,
};
