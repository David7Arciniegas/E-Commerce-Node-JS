// Models
const { Cart } = require('../models/carts.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const cartExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const cart = await Comment.findOne({ where: { id } });

	if (!cart) {
		return next(new AppError('Comment not found', 404));
	}

	req.cart = cart;
	next();
});

module.exports = { cartExists };
