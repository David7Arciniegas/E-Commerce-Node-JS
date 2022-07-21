// Models
const { Products } = require('../models/products.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const productExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const product = await Products.findOne({
		where: { id },
		
	});

	if (!product) {
		return next(new AppError('Post not found', 404));
	}

	req.post = product;
	next();
});

module.exports = { productExists };
