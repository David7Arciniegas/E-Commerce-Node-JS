// Models
const { Products } = require('../models/products.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const productExists = catchAsync(async (req, res, next) => {
	let { productId, quantity } = req.body;
	if(!productId){
		productId = req.params;
	}

	const product = await Products.findOne({
		where: { id:productId, status:'active'},
		
	});

	if (!product) {
		return next(new AppError('Product not found', 404));
	}

	req.product = product;
	next();
});

module.exports = { productExists };
