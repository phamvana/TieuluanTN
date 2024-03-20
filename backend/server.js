// Cập nhật thư viện
import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

// Thêm các file
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import {
    notFound,
    errorHandler
} from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// ---------------
dotenv.config(); // Sử dungh biến môi trường

// Kết nối cơ sở dữ liệu MongoDB từ config/db.js
connectDB();

// Sử dụng express
const studionhu = express();

// sử dụng morgan
if (process.env.NODE_ENV === "development") {
    studionhu.use(morgan("dev"));
}

// Tạo Json
studionhu.use(express.json());

//route chính
studionhu.get("/", (req, res) => {
    res.send("API is on running... | Trang web đã được thực thi ... ");
});

// Các route của chương trình
studionhu.use("/api/products", productRoutes); //Sản phẩm
studionhu.use("/api/users", userRoutes);       //người dùng
studionhu.use("/api/orders", orderRoutes);     //đặt hàng
studionhu.use("/api/upload", uploadRoutes);    //cập nhật

// route thanh toán
studionhu.get("/api/config/paypal", (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

// đường dẫn 
const __dirname = path.resolve();
studionhu.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Không tìm thấy route
studionhu.use(notFound);

// Lỗi
studionhu.use(errorHandler);

// Port hoạt động của app. Sử dụng biến nôi trường hoặc giá tị biến 3300
const PORT = process.env.PORT || 3300;
studionhu.listen(
    PORT,
    console.log(
        `Server is on running in ${process.env.NODE_ENV} on port ${PORT}`.yellow
            .bold
    ),
);