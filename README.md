# Tiểu luận tốt nghiệp

## Đề tài: WEBSITE STUDIO NHƯ

- THỰC HIỆN: PHẠM VĂN Á MSSV:
- MSSV: CM21V7X306

---

## Báo cáo và hướng dẫn chạy dự án

- [Báo cáo Tiểu luận](https://docs.google.com/document/d/1pBuecpWnVnyw-nnBTALrKOULtWCm_6oPJgoiKN2oVRI/edit?usp=sharing)
- [Xem hướng dẫn chạy dự án](huongdan.md)

## CẬP NHẬT NHẬT KÝ THỰC HIỆN CODE

**Nhật ký sẽ cập nhật theo ngày gần nhất, từ trên xuống dưới.**

### _20/3/2024 - Tìm hiểu về biến môi trường_

### Kết nối với dữ liệu MongoDB

**File:** `config/db.js`
- Thêm thư viện mongoose. 
- Thư viện được cài đặt bằng lệnh `npm i mongoose`
- [Tham khảo tại trang](https://www.npmjs.com/package/mongoose)
- Sử dụng `async\await` để kết nối MongoDB từ biến môi trường `.env`
- Xử lý ngoại lệ xác định ứng dụng có kết nối được hay không.
- Cách kết nối MongoDB với tài khoản trên MongoDB Cloud như hình

![ Hình 1 ](config/1.jpg)


---
- Khi sử sụng máy tính tại nhà để clone dữ liệu về thì app không chạy do lỗi biến môi trường không cập nhật được đường dẫn của MongoDB. Để nắm sâu hơn về biến môi trường tôi phải tự tìm hiểu.
- 1. Tạo file .env lưu các biến cần thiết
- 2. Cài đặt gói dotenv để chạy được biến môi trường.
- 3. Tham khảo thêm các tài liệu về dotenv
     [https://www.npmjs.com/package/dotenv]

### Tìm hiểu và cài đặt Server

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
  - 1.  [Tài liệu](https://viblo.asia/p/tim-hieu-ve-middleware-trong-expressjs-gVQelwaaGZJ)
  - 2.  [video hướng dẫn](https://youtu.be/g4z5zwJMSuo)
  - 3.  Phần mềm trung gian để xử lý một vấn đề nào đó
  - 4.  Sử dụng middle lỗi được thêm ở thư mục `/middleware/errorMiddleware.js`. Trong middleware có 2 hàm notFound và errorHandler.
  - 5. `studionhu.use(notFound);` khi không tìm thấy địa chỉ
  - 6. `studionhu.use(errorHandler);`
- Ứng dụng khởi chạy sẽ lắng nghe cổng được cài đặt
  - 1.  Biến PORT
  - 2.  In ra màn hình console cổng và thông báo
- Thực hiện kết nối với MongoDB bằng thư viện `mongoose`
  - 1.  Chạy hàm `connectDB();` để thực thi nội dung trong `./config/db.js`
  - 2.  Cấu hình MongoDB để kết nối với ứng dụng.

---

## _19/3/2024 - Cập nhật file_

- Tạo git respo
- Kết nối cơ sở dữ liệu, chạy backend ban đầu.
