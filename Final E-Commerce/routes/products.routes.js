const express = require("express");

// Controllers
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
} = require("../controllers/products.controller");

// Middlewares
const { productExists, categoryExists } = require("../middlewares/products.middleware");
const { protectSession } = require("../middlewares/auth.middleware");
const {
  createProductValidators, createCategoryValidators, updateProductValidators, updateCategoryValidators
} = require('../middlewares/validators.middleware');
// Utils

const productsRouter = express.Router();

productsRouter
    .use(protectSession)
    .post("/",createProductValidators, createProduct)
    .get('/', getAllProducts)
    .get("/categories", getAllCategories)
    .get('/:id', getProductById)
    .patch("/:id",updateProductValidators,productExists, updateProduct)
    .delete("/:id",productExists, deleteProduct)

    .post("/categories",createCategoryValidators, createCategory)
    .patch("/categories/:id",updateCategoryValidators,categoryExists, updateCategory);
//.post(upload.array("postImg", 3), createPost);


module.exports = { productsRouter };
