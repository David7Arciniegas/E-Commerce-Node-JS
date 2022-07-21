const express = require("express");

// Controllers
const {
  getAllProducts,
  getAllCategories,
  createCategory,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateCategory,
} = require("../controllers/posts.controller");

// Middlewares
const { productExists } = require("../middlewares/products.middleware");
const { protectSession } = require("../middlewares/auth.middleware");
const { createProduct } = require("../controllers/products.controller");

// Utils

const productsRouter = express.Router();

productsRouter.use(protectSession);

productsRouter
  .route("/")
  .post("/", createProduct)
  .get(getAllProducts)
  .post(upload.array("postImg", 3), createPost);

productsRouter
  .use("/:id", postExists)
  .route("/:id")
  .get("/:id", getProductById)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct)
  .get("/categories", getAllCategories)
  .post("/categories", createCategory)
  .patch("/categories/:id", updateCategory);

module.exports = { productsRouter };
