# Tìm hiểu và cài đặt Server

_Tên file server.js_

- Cập nhật các thư viện: path, express, dotenv, color
- Thêm các file:
- Sử dụng biến môi trường
- Đặt biến `studionhu = express();`
- Tìm hiểu về thư viện `morgan`
  - 1.  Cài đặt: `npm i morgan`
  - 2.  [Tài liệu](https://www.npmjs.com/package/morgan)
  - 3.  Công cụ ghi logger request từ máy client lên server
- Các route của phần mềm
  - 1.  Sản phẩm `/api/products`
  - 2.  Người dùng `/api/users`
  - 3.  Đặt hàng `/api/orders`
  - 4.  Cập nhật `/api/upload`
  - 5.  Paypal `/api/config/paypay`?
- Tìm hiểu biến đường dẫn
  - 1. [video hướng dẫn](https://youtu.be/KBMx0ITKrGc)
  - 2. [Tài liệu](https://nodejs.org/api/path.html)
  - 3. Thực hiện các đường dẫn tĩnh của ứng dụng
- Tìm hiểu middleware
  - 1.  [Tài liệu](https://viblo.asia/p/tim-hieu-ve-middleware-trong-expressjs-gVQelwaaGZJ)`
  - 2.  [video hướng dẫn](https://youtu.be/g4z5zwJMSuo)
  - 3.  Phần mềm trung gian để xử lý một vấn đề nào đó
  - 4.  Sử dụng middle lỗi được thêm ở thư mục `/middleware/errorMiddleware.js`. 
  
  Trong middleware có 2 hàm notFound và errorHandler.
  - 5. `studionhu.use(notFound);` khi không tìm thấy địa chỉ
  - 6. `studionhu.use(errorHandler);`
- Ứng dụng khởi chạy sẽ lắng nghe cổng được cài đặt
  - 1.  Biến PORT giá trị cổng chạy server
  - 2.  In ra màn hình console cổng và thông báo
- Thực hiện kết nối với MongoDB bằng thư viện `mongoose`
  - 1.  Chạy hàm `connectDB();` để thực thi nội dung trong `./config/db.js`
  - 2.  Cấu hình MongoDB để kết nối với ứng dụng.
