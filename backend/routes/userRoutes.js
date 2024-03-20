import express from "express";
/**
 * Thêm các controller
 */
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from "../controller/userController.js";
 
/**
  * Thêm các middleware
  */
import {
    protect,
    admin
} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Định nghĩa route
 */
router.route("/").post(registerUser).get(protect, admin, getUsers);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);
router.post("/login", authUser);
// router.get("/:id");
//ADMIN

export default router;