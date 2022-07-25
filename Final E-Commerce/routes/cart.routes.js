const express = require('express');

// Controller
const {
	addProductToCart,
    updateCartProduct,
    removeProductFromCart,
    purchaseUserCart,
} = require('../controllers/cart.controller');

// Middlewares
const { cartExists } = require('../middlewares/cart.middleware');
const { protectSession } = require('../middlewares/auth.middleware');
const { getAllProducts } = require('../controllers/products.controller');

const cartRouter = express.Router();

cartRouter.route('/').get(getAllProducts);

cartRouter.use(protectSession);



cartRouter
	.use('/:id', cartExists)
	.route('/:id')
	.post('/add-product', addProductToCart)
	.patch('/update-cart', updateCartProduct)
	.delete('/:productId', removeProductFromCart)
	.post('/purchase', purchaseUserCart)

module.exports = { commentsRouter };
