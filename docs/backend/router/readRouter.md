
**File:** routes/uploadtRoutes.js

- Sử dụng biến `path`
- Thêm thư viện express
- Thêm thư viện multer
  **(Tìm hiểu về thư viện này)**
  - 1. [Tài liệu](https://www.npmjs.com/package/multer)
  - 2. [Video hướng dẫn](https://youtu.be/huNB4wSxPqg)
  - 3. **Công dụng:** Ghi file vào thư mục đã chỉ định.
- Phương thức Router của express
- Định nghĩa biến storage.
  - 1. Dùng thư viện multer, hàm diskStorage()
  - 2. Thực hiện hàm destination(req, file, cb) với các tham số req, file, cb. Trong đó cb là hàm có 2 tham số null, upload/
  - 3. Thực hiện hàm filename(req, file, cb). Trong đó cb(null, tên file)
- Hàm kiểm tra loại file được upload
  - 1. Định nghĩa loại file
  - 2. định nghĩa extname
  - 3. định nghĩa mimetype
  - 4. Điều kiện kiểm tra tập tin. Nếu thoả đồng thời extname và mimetype thì trả về kết quả hàm cb(null,true) ngược lại trả về thông báo "Chỉ cho phép file hình ảnh"
- Định nghĩa biến upload gán bằng hàm multer() có thám số storage, fileFilter
- Định nghĩa router

| STT | Tên route | Phương thức | Middlewar              | controller | Chức năng                |
| :-- | :-------- | :---------- | :--------------------- | :--------- | :----------------------- |
| 1   | /         | POST        | upload.single("image") |            | Upload file lên ứng dụng |

---

**File:** routes/userRoutes.js

- Thêm thư viện express
- Thêm controller
- Thêm middleware
- Định nghĩa router

| STT | Tên route | Phương thức | Middlewar      | controller        | Chức năng                                  |
| :-- | :-------- | :---------- | :------------- | :---------------- | :----------------------------------------- |
| 1   | /         | POST        |                | registerUser      | Đăng ký thành viên                         |
| 2   | /         | GET         | protect, admin | getUsers          | Thông tin tài khoản                        |
| 3   | /profile  | GET         | protect        | getUserProfile    | Trả về thông tin người dùng                |
| 4   | /profile  | PUT         | protect        | updateUserProfile | Cập nhật tài khoản thành viên              |
| 5   | /:id      | GET         | protect, admin | getUserById       | Thông tin thành viên của tài khoản quản lý |
| 6   | /:id      | PUT         | protect, admin | updateUser        | Cập nhật thành viên của tài khoản quản lý  |
| 7   | /:id      | DELETE      | protect, admin | deleteUser        | Xoá thành viên của tài khoản quản lý       |

---

**File:** routes/orderRoutes.js

- Thêm thư viện express
- Thêm các `controller (addOrderItems, updateOrderToPaid, getOrderByID, getMyOrders, getOrders, updateOrderToDelivered)` từ `controller/orderController.js`
- Định nghĩa router

| STT | Tên route    | Phương thức | Middlewar      | controller             | Chức năng                       |
| :-- | :----------- | :---------- | :------------- | :--------------------- | :------------------------------ |
| 1   | /            | POST        | protect        | addOrderItems          | Thêm đặt hàng                   |
| 2   | /            | GET         | protect, admin | getOrders              | Thông tin đơn hàng              |
| 3   | myorders     | GET         | protect        | getOrderByID           | Thông tin một đơn hàng          |
| 4   | /:id/pay     | PUT         | protect        | updateOrderToPaid      | **Tìm hiểu thêm chức năng này** |
| 5   | /:id/deliver | PUT         | protect, admin | updateOrderToDelivered | **Tìm hiểu thêm chức năng này** |

---

### _20/3/2024 - Tìm hiểu hoạt động của ruote_

**File:** routes/productRoutes.js

- Thêm thư viện express
- Thêm các controller
- Thêm middleware
- Định nghĩa route

  _Định dạng bảng_

| STT | Tên route    | Phương thức | Middlewar      | controller          | Chức năng                                  |
| :-- | :----------- | :---------- | :------------- | :------------------ | :----------------------------------------- |
| 1   | /            | GET         |                | getProducts         | Trả về toàn bộ sản phẩm trong bảng dữ liệu |
| 2   | /            | POST        | protect, admin | createProduct       | Tạo mới sản phẩm                           |
| 3   | /:id/reviews | POST        | protect        | createProductReview | **Tìm hiểu thêm từ controller**            |
| 4   | /top         | GET         |                | getTopProducts      | Trả về sản phẩm có top                     |
| 5   | /:id         | GET         |                | getProductById      | Trả về 1 sản phẩm có `:id`                 |
| 6   | /:id         | DELETE      | protect, admin | deleteProduct       | Xoá sản phẩm theo `:id`                    |
| 7   | /:id         | PUT         | protect, admin | updateProduct       | Cập nhật sản phẩm theo `:id`               |

---

- 1. `router.route("/").get(getProducts)` phương thức GET lấy `controller getProducts`. Phương thức này trả về toàn bộ products của dữ liệu. Sẽ tìm hiểu phần này trong controller. url: http://localhost:5000/api/products (PORT có thể thay đổi tuỳ theo cài đặt)
- 2. `router.route("/").post(protect, admin, createProduct);` phương thức POST để tạo sản phẩm mới. Sử dụng `middleware protect, admin` và `controller createProduct`. Dùng Postman để kiểm tra
- 3. `router.route("/:id/reviews").post(protect, createProductReview);` phương thức POST, phương thức sử dụng `middleware protect`
- 4. `router.get("/top", getTopProducts);` phương thức GET lấy giá trị top từ `controller getTopProducts`. url: http://localhost:5000/api/products/top
- 5. Các route có tham số `id` của sản phẩm. Xem 1 sản phẩm của `id` đó, cập nhật hoặc xoá sản phẩm. Khi cập nhật hoặc xoá cần qua middleware.

---

**File:** routes/orderRoutes.js

- Thêm thư viện express
- Thêm các `controller (addOrderItems, updateOrderToPaid, getOrderByID, getMyOrders, getOrders, updateOrderToDelivered)` từ `controller/orderController.js`
- Định nghĩa router


**File:** routes/userRoutes.js

- Thêm thư viện express
- Thêm controller
- Thêm middleware
- Định nghĩa router

---

**File:** routes/uploadtRoutes.js

- Sử dụng biến `path`
- Thêm thư viện express
- Thêm thư viện multer **(Tìm hiểu về thư viện này)**
- Phương thức Router của express
- **(Tiêp tục tìm hiểu)**
