import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authenticateAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

// User creation route
router
  .route("/")
  .post(createUser)
  .get(authenticate, authenticateAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// Admin routes
router
  .route("/:id")
  .delete(authenticate, authenticateAdmin, deleteUserById)
  .get(authenticate, authenticateAdmin, getUserById)
  .put(authenticate, authenticateAdmin, updateUserById);

export default router;
// This code sets up an Express router for user-related routes, specifically for creating a new user. The `createUser` function is imported from the controller and is used to handle POST requests to the `/api/users` endpoint.
