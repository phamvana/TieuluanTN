import express from "express"; //Thêm thư viện express
/**
 * Thêm các controller từ controller/productController.js
 * 
 */
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
} from "../controller/productController.js";
/**
 * Thêm middleware để sử dụng cho các định nghĩa route bên dưới
 * protect:
 * admin:
 */
import {
    protect,
    admin
} from "../middleware/authMiddleware.js";

/**
 * Phương thức Router của express
 * 
 */
const router = express.Router();

/**
 * Định nghĩa route với các phương thức tương ứng.
 */

// router.route("/").get(getProducts).post(protect, admin, createProduct);
/**
 * Tạo route để kiểm tra controller
 */
router.route("/").get(getProducts).post(createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router
    .route("/:id")
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;