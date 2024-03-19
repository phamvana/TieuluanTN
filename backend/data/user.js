import bcrypt from "bcryptjs";
const users = [{
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
}, {
    name: "Thanh Dat",
    email: "thanhdat@example.com",
    password: bcrypt.hashSync("123456", 10),
}, {
    name: "Nhu Ngoc",
    password: bcrypt.hashSync("123456", 10),
    email: "nhungoc@example.com",
}, ];

export default users;