# Tài liệu của Model

   23/3/2024
1. Model là gì? 

   **Model** là một thần phần của mô hình MVC.

![MVC](../../pictue/mvc.webp)

> Nhiệm vụ chính của thành phần này chỉ đơn giản là quản lý dữ liệu. Model sẽ chịu trách nhiệm quản lý dữ liệu từ cơ sở dữ liệu, API hay JSON.

2. Các file chứa trong Model

Trong model có 3 file:
 `orderModel.js; productModel.js và userModel.js` lần lược sẽ tìm hiểu các chức năng.

3. Cấu trúc

   **File:** models/[orderModel.js](./orderModel.js)

   - Thêm thư viện mongoose vào `import mongoose from "mongoose";`
   - orderSchema tạo `user, orderItems, shippingAddress, paymentMethod, paymentResult, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, timestamps`

   **File:** models/[productModel.js](./productModel.js)

   - Thêm thư viện mongoose vào `import mongoose from "mongoose";`
   - Tạo reviewSchema có cấu trúc như sau:

![reviewSchema](./picture/reviewSchema.PNG)

   - Tạo `productSchema` có cấu trúc như sau

![productSchema](./picture/productSchema.PNG)

   - Tạo tên biến `const Product = mongoose.model("Product", productSchema);`
   - Biến `Product` được xuất để các thành phần khác truy xuất đến `export default Product;`

   **File:** models/userModel.js
   
   - Thêm thư viện mongoose vào `import mongoose from "mongoose";`
   - Thêm thư viện bcrypt vào `import bcrypt from "bcryptjs";` mã hoá mật khẩu.
   - Cấu trúc userModel như sau

   ![userSchema](./picture/userSchema.PNG)
   userSchema
   | STT | Tên | Kiểu | Bắt buộc | Diễn giải |
   |:----|:----|:-----|:---------|:----------|
4. Kết quả

**Phạm Văn Á** thực hiện