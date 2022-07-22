// Models
const { Cart } = require("../models/carts.model");
const { Users } = require("../models/users.model");
const { Products } = require("../models/products.model");
const { ProductsInCart } = require("../models/productsInCart.model");


// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const AddProductToCart = catchAsync(async (req, res, next) => {
  const userId = req.sessionUser.id;
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  const productToAdd = await Products.findOne({
    where: { status: "active", productId },
  });

  if (!productToAdd) {
    return next(new AppError("No product found for that cart", 404));
  }
  if (productToAdd.quantity == 5 && quantity > 1)
    return next(new AppError("Cart quantity limit exceeded", 409));

  let userCart = await Cart.findOne({
    where: { status: "active", productId },
	include: [{model: ProductsInCart}, {model: Cart}],
  });

  const productsInCart_ = userCart.productsInCart.findOne(element => element.id === productToAdd.id)
  if (productsInCart_) {
	return next(new AppError("Product has already been added", 404));
  }else{
	if (productsInCart_.status === "removed" ){
  		productsInCart_.status = "active"}
		userCart.productsInCart.push(productToAdd)

		const foundIndex = userCart.productsInCart.findIndex(x => x.id == productsInCart_.id);
		userCart.productsInCart[foundIndex] = productsInCart_
		
}});

const fullCart = await Cart.create(userCart);


  res.status(201).json({
    status: "success",
    fullCart,
  });







const getAllComments = catchAsync(async (req, res, next) => {
  // Deep includes
  const comments = await Comment.findAll({
    attributes: ["id", "comment"],
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      {
        model: Post,
        attributes: ["id", "title", "content"],
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    comments,
  });
});

const getCommentById = catchAsync(async (req, res, next) => {
  const { comment } = req;

  res.status(200).json({
    status: "success",
    comment,
  });
});

const updateComment = catchAsync(async (req, res, next) => {
  const { comment } = req;
  const { newComment } = req.body;

  await comment.update({ comment: newComment });

  res.status(204).json({
    status: "success",
  });
});

const deleteComment = catchAsync(async (req, res, next) => {
  const { comment } = req;

  await comment.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  getAllComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
};
