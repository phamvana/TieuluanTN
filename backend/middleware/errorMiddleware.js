const notFound = (req, res, next) => {
    const error = new Error(`Not found | Không tìm thấy - ${req.originalUrl}`);
    res.status(404); //trả về 404
    next(error);     //Hàm lỗi được thực thi
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production " ? null : err.stack,
    });
};

export {
    notFound,
    errorHandler
};