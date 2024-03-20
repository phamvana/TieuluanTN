// Cập nhật các thư viện
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
// Cập nhật đường dẫn liên quan
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

// Sử dụng dotenv lấy các thông số
dotenv.config();

// Kết nối cơ sở dữ liệu
connectDB();

// Biến importData
const importData = async () => {
    try {
        await Order.deleteMany();    // Xoá dữ liệu bảng Order
        await Product.deleteMany();  // Xoá dữ liệu bảng Product
        await User.deleteMany();     //Xoá dữ liệu bản User
        // Tạo biến createdUser 
        const createdUsers = await User.insertMany(users);
        // Biến adminUser
        const adminUser = createdUsers[0]._id;
        // Biến sampleProducts
        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser
            };
        });
        await Product.insertMany(sampleProducts);
        console.log("data imported... Dữ liệu của bạn đã được cập nhật ...".green.inverse);
        // Thoát tuyến trình
        process.exit();
    } catch (err) {     //Nếu có lỗi xãy ra ==> thông báo
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
};

// Biến destroyData
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("data Destroyed...".green.inverse);
        process.exit();
    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
};


if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}