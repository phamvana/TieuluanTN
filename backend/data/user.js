import bcrypt from "bcryptjs";
const users = [{
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("6543210", 10),
    isAdmin: true,
}, {
    name: "Phạm Văn Á",
    email: "phamvana@example.com",
    password: bcrypt.hashSync("102184pvA", 10),
}, {
    name: "Ngoc Nhu",
    password: bcrypt.hashSync("studionhu", 10),
    email: "nhungoc@example.com",
},];

export default users;

/**
 * dùng postman đăng ký tài khoản mới
 *  {
    "_id": "6600f2f427c131aa20c6ff57",
    "name": "phamvana",
    "email": "pva@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDBmMmY0MjdjMTMxYWEyMGM2ZmY1NyIsImlhdCI6MTcxMTMzODIyOSwiZXhwIjoxNzEzOTMwMjI5fQ.QKH2hwpmZfFU6MaHiVMA_gmBXU-h3HPLJeOPb8t8wgw",
    "isAdmin": false
}
 */