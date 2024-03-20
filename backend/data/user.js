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