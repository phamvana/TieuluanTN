/**
 * Thêm thư viện 
 * path
 * express
 * multer
 * 
 */
import path from "path";
import express from "express";
import multer from "multer";

/**
 * Phương thức Router của express
 */
const router = express.Router();

/**
 * Định nghĩa biến storage
 */
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

/**
 * Hàm checkFileType 
 */
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Images only!");
    }
}

/**
 * Biến upload 
 */
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

/**
 * Định nghĩa router
 */
router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
    // res.send(`/${req.file.path.replace(/\\/g, "/")}`)
});

export default router;