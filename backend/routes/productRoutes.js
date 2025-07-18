import express, { Router } from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js"
import { authenticate, authenticateAdmin } from "../middlewares/authMiddleware.js";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(fetchProducts).post(authenticate, authenticateAdmin, formidable(), addProduct ); 
router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.route("/:id")
  .get(fetchProductById)
  .put(authenticate, authenticateAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authenticateAdmin, removeProduct);
router.route("/filtered-products").post(filterProducts);

export default router;