import express from "express";
const router = express.Router();
import { createCategory, updateCategory, removeCategory, listCategory, readCategory } from '../controllers/categoryController.js'
import { authenticate, authenticateAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authenticateAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authenticateAdmin, updateCategory);
router.route("/:categoryId").delete(authenticate, authenticateAdmin, removeCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;