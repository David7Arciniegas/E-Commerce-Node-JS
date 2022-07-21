const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Models
const { Products } = require("../models/post.model");
const { PostImg } = require("../models/postImg.model");
const { Users } = require("../models/users.model");
const { Categories } = require("../models/categories.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { Email } = require("../utils/email.util");
const { storage } = require("../utils/firebase.util");

const getAllProducts = catchAsync(async (req, res, next) => {
  // Include all products
  const products = await Products.findAll({
    where: { status: "active" },
  });

  if (!products) {
    return next(new AppError("No products found for that user", 404));
  }
  res.status(200).json({
    status: "success",
    products,
  });
});

const createProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, categoryId, quantity } = req.body;
  const userId = req.sessionUser.id;

  const newProduct = await Products.create({
    userId,
    title,
    description,
    price,
    categoryId,
    quantity,
  });

  if (req.files.length > 0) {
    const filesPromises = req.files.map(async (file) => {
      const imgRef = ref(
        storage,
        `products/${Date.now()}_${file.originalname}`
      );
      const imgRes = await uploadBytes(imgRef, file.buffer);

      return await PostImg.create({
        postId: newPost.id,
        imgUrl: imgRes.metadata.fullPath,
      });
    });

    await Promise.all(filesPromises);
  }

  // Send mail when post has been created
  await new Email(sessionUser.email).sendNewPost(title, content);

  res.status(201).json({
    status: "success",
    newPost,
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const userId = req.sessionUser.id;
  const products = await Products.findAll({
    where: { userId },
  });

  if (!products) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  // Map async
  const postImgsPromises = post.postImgs.map(async (postImg) => {
    const imgRef = ref(storage, postImg.imgUrl);

    const imgFullPath = await getDownloadURL(imgRef);

    postImg.imgUrl = imgFullPath;
  });

  await Promise.all(postImgsPromises);

  res.status(200).json({
    status: "success",
    post,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { title, desription, price, quantity } = req.body;

  await product.update({ title, desription, price, quantity });

  res.status(204).json({ status: "success" });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const categoriesId = req.sessionUser.id;
  const categories = await Categories.findAll({
    where: {
      categoriesId,
      status: "active",
    },
  });

  if (!categories) {
    return next(new AppError("No categories found for that user", 404));
  }

  res.status(200).json({
    status: "success",
    categories,
  });
});

const createCategory = catchAsync(async (req, res, next) => {
  const { categoryId, name } = req.body;

  const newCategory = await Categories.create({
    categoryId,
    name,
  });


  if (!categoryId) {
    return next(new AppError("No categories found for that user", 404));
  }

  res.status(200).json({
    status: "success",
    newCategory,
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { name } = req;

  await category.update({ name });

  res.status(204).json({ status: "success" });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
};
