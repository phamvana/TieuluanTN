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

   Bảng diễn giải **productSchema**

   | STT | Tên | Kiểu | Khoá | Bắt buộc | Diễn giải |
   |:----|:----|:-----|:-----|:---------|:----------|
   | 1 | id | Object | *| * | Chương trình tự sinh ra mã |
   | 2 | user | `mongoose.Schema.Types.ObjectId` | | * | Liên kết đến bảng `User` |
   | 3 | name | String | | * | Tên sản phẩm |
   

***
   **File:** models/userModel.js
   
   - Thêm thư viện mongoose vào `import mongoose from "mongoose";`
   [Tài liệu mongoose](https://www.npmjs.com/package/mongoose)
   - Thêm thư viện bcrypt vào `import bcrypt from "bcryptjs";` mã hoá mật khẩu.
   [Tài liệu bcryptjs](https://www.npmjs.com/package/bcryptjs)
   - Cấu trúc userModel như sau

   ![userSchema](./picture/userSchema.PNG)

   Bảng diễn giải **userSchema**

   | STT | Tên | Kiểu | Khoá | Bắt buộc | Diễn giải |
   |:----|:----|:-----|:-----|:---------|:----------|
   | 1 | id | Object | *| * | Chương trình tự sinh ra mã |
   | 2 | name | String |   | * | Lưu tên tài khoản người dùng| 
   | 3 | email | String |  | * | Lưu thông tin tài khoản email. Thuộc tính duy nhất |
   | 4 | password | String | | * | Lưu mật khẩu, được mã hoá `bcryptjs` |
   | 5 | isAdmin | Boolean | | * | Tài khoản thường hoặc là quản lý |

   - Mã hoá mật khẩu 
   
    > `userSchema.methods.matchPassword = async function(enteredPassword) {    return await bcrypt.compare(enteredPassword, this.password);};`
   
   - Middlewarte xửa lý mật khẩu
   
   ![pass](./picture/middleware-pass.PNG)

   Xuất `user` để các thành phần khác truy xuất `const user = mongoose.model("User", userSchema);`

   > export default user;

4. Kết quả

**Phạm Văn Á** thực hiện