import express from "express";
/**
 * Thêm các controller
 */
import {
    addOrderItems,
    updateOrderToPaid,
    getOrderByID,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
} from "../controller/orderController.js";
/**
 * Thêm middleware
 */
import {
    admin,
    protect
} from "../middleware/authMiddleware.js";

/**
 * Sử dụng phương thức Router của express
 */
const router = express.Router();

/**
 * Các định nghĩa router
 * tất cả router đều cần xử lý qua middleware. 
 * Tuỳ theo từng router mà cần dùng middleware phù hợp (protect và admin)
 */
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;