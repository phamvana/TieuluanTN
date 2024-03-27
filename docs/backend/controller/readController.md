
**Tạo route để kiểm tra các controller cần thiết**

---

**File:** controller/orderController.js

- Thêm thư viện `express-async-handler`
- Thêm file `../models/orderModel.js` [tài liệu models](../models/ReadModel.md)
- Tạo các controller

  - 1. addOrderItems
    - Đặt tên biến ` addOrderItems = asyncHandler(async (req, res) ...  = req.body`
    - Nếu `orderItems && orderItems.length === 0` thì báo lỗi
    - Ngược lại thì cập nhật `const createdOrder = await order.save(); res.status(201).json(createdOrder);`
  - 2. getOrderByID
    - Đặt tên biến `const order = await Order.findById(req.params.id).populate("user", "name email");` lấy thông tin đơn hàng theo `user và name email`
    - Nếu điều kiện đúng (order) thì trả về json `res.json(order);` ngược lại thì báo lỗi.
  - 3. updateOrderToPaid: cập nhật đơn đặt hàng
    - Đặt tên biến `const order = await Order.findById(req.params.id);` tìm đơn hàng theo `id`.
    - Nếu tìm thấy (điều kiện đúng) thì `order.isPaid = true; order.paidAt = Date.now(); ... const updatedOrder = await order.save();` trả về client json `res.json(updatedOrder);`
    - Ngược lại thì thông báo lỗi `res.status(404); throw new Error("Order not found | Không tìm thấy đơn hàng");`
  - 4. updateOrderToDelivered: cập nhật đơn hàng
    - Đặt tên biến `const order = await Order.findById(req.params.id);` tìm đơn đặt hàng bằng `id`
    - Nếu tồn tại (điều kiện đúng) thì `order.isDelivered = true; order.deliveredAt = Date.now(); const updatedOrder = await order.save();` trả về json `res.json(updatedOrder)`
    - Ngược lại thì thông báo lỗi `res.status(404); throw new Error("Order not found | Đơn hàng không tìm thấy");`
  - 5. getMyOrders: xem đơn hàng của mình
    - Đặt tên biến `const orders = await Order.find({user: req.user._id,});` tìm theo id của thành viên
    - Kết quả trả về json `res.json(orders)`.
  - 6. getOrders: người quản lý xem đặt hàng của thành viên
    - Đặt tên biến `const orders = await Order.find().populate("user", "id name");` tìm theo người dùng và id.
    - Kết quả trả về json `res.json(orders)`

---

### _21/3/2024 - Tìm hiểu hoạt Controller_

- [Controller là gì](https://viblo.asia/p/nodejs-bai-8-controller-LzD5dgAeljY)
- Các file `controller` được lưu trong thư mục cùng tên
  - 1. orderController.js
  - 2. productController.js
  - 3. userController.js

**File:** controller/userController.js

- Thêm thư viện `express-async-handler`
- Thêm file `../models/userModel.js` [tài liệu models](../models/ReadModel.md)
- Thêm file `../utils/generateToken.js`
- Tạo các controller
  - 1. authUser: xác minh tài khoản
    - Lấy giá trị req.body từ client gửi lên là `email, password`
    - Đặt tên biến `user = await User.findOne({email})` giá trị tìm kiếm email trong cơ sở dữ liệu.
    - Nếu đồng thời user và mật khẩu trung khớp thì trả về json `id, name, email, isAdmin, token` ngược lại báo lỗi 401
  - 2. registerUser: đăng ký tài khoản
    - Lấy giá trị req.body từ client gửi lên là `email, password`
    - Đặt tên biến `userExists = await User.findOne({email})` kiểm tra email có tồn tại trong database không. Nếu tồn tại thì báo lỗi.
    - Đặt tên biến `user = await User.create({name,email,password,});` nếu thoả điều kiện thì trả về json `_id: user._id, name: user.name, email: user.email, token: generate(user._id), isAdmin: user.isAdmin,` ngược lại báo lỗi.
  - 3. getUserProfile: lấy thông tin thành viên
    - Đặt tên biến `const user = await User.findById(req.user._id);`
    - Nếu tồn tại user thì trả về json `_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin,`
    - Ngược lại báo lỗi.
  - 4. updateUserProfile: cập nhật thông tin thành viên
    - Đặt tên biến `const user = await User.findById(req.user._id);` tìm theo `id`
    - Nếu tồn tại `user` thì gán giá trị `(user.name = req.body.name || user.name)`, `(user.email = req.body.email || user.email)`. Nếu client gửi mật khẩu thì gán mật khẩu cho `user` . Cập nhật thông tin `const updatedUser = await user.save();`.Trả về cho client giá trị json `_id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin, token: generate(updatedUser._id)` ngược lại thì báo lỗi.
  - 5. getUsers: trả về thông tin tất cả thành viên
    - Đặt tên biến `const users = await User.find();`
    - Trả về kết quả `res.json(users)`
  - 6. deleteUser: xoá tài khoản người dùng. Quản trị hệ thống có quyền
    - Đặt tên biến `const user = await User.findById(req.params.id);` tìm thành viên bằng `id`
    - Nếu tìm thấy thì xoá `await user.remove();` ngược lại báo lỗi `throw new Error("User not found");`.
  - 7. getUserById: trả về thông tin của thành viên
    - Đặt tên biến `const user = await User.findById(req.params.id).select("-password");`
    - Nếu tồn tại thì trả về json `res.json(user);` ngược lại thò báo lỗi.
  - 8. updateUser: cập nhật thành viên
    - Đặt tên biến `const user = await User.findById(req.params.id);` tìm theo `id`
    - Nếu tồn tại thì cập nhật, ngược lại thì báo lỗi.

---

**File:** controller/productController.js

- Thêm thư viện `express-async-handler`
  - [Tài liệu](https://www.npmjs.com/package/express-async-handler)
  - Thư viện này xử lý đồng bộ.
- Thêm file `../models/productModel.js` [tài liệu models](../models/ReadModel.md)
- Tạo các controller cho ứng dụng
  - 1. getProducts: Trả về tất cả sản phẩm
    - 1. **Các giá trị tính toán**
      - 1. pageSize: kích thước trang có thể chứa số sản phẩm, gán 8.
      - 2. page: trang được lấy từ số trang hoặc 1.
      - 3. keyword
      - 4. count: số sản phẩm
      - 5. products: danh sách sản phẩm trong dữ liệu
    - 2. **Giá trị trả về cho client (res) là json**
      - 1. products: danh sách sản phẩm trong dữ liệu
      - 2. page: trang
      - 3. pages: tổng số trang
  - 2. getProductById: Trả về giá trị 1 sản phẩm theo `id`
    - 1. **Các giá trị tính toán**
      - `const product = await Product.findById(req.params.id);`
    - 2. **Giá trị trả về cho client (res)**
      - Nếu tìm thấy thì trả về kết quả `res.json(product);`
      - Ngược lại thì gán 404 cho status và tạo hàm lỗi.
  - 3. getTopProducts: Trả về sản phẩm có đánh giá cao
    - 1. **Các giá trị tính toán**
      - products: danh sách sản phẩm. Sắp xếp sản phẩm theo rating cao nhất, giới hạn 5 sản phẩm
    - 2. **Giá trị trả về cho client (res)**
      - Trả về danh sách sản phẩm theo sắp xếp và giới hạn 5.
  - 4. deleteProduct: xoá sản phẩm dành cho nhân viên quản lý, tài khoản admin
    - 1. **Các giá trị tính toán**
      - `const product = await Product.findById(req.params.id);`
    - 2. **Giá trị trả về cho client (res)**
      - Nếu tìm thấy sp thì xoá khỏi dữ liệu và thông báo đã xoá
      - Nếu không tìm thấy thì thông báo lỗi.
  - 5. createProduct: tạo sản phẩm mới dành cho nhân viên quản lý, tài khoản admin
    - 1. **Các giá trị tính toán**
    - 2. **Giá trị trả về cho client (res)**
  - 6. updateProduct: cập nhật sản phẩm
    - 1. **Các giá trị tính toán**
    - 2. **Giá trị trả về cho client (res)**
  - 7. createProductReview: tạo đánh giá sản phẩm - 1. **Các giá trị tính toán** - 2. **Giá trị trả về cho client (res)**
       **Lưu ý:** Có một số controller phát triển để người dùng bình thường sử dụng, có một số controller phát triển cho đối tượng quản lý xử dụng.

---
**Phạm Văn Á thực hiện**