/**
 * Thư viện express-async-handler
 */
import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

/**
 * GET all products - Tất cả các sản phẩm 
 * GET /api/products
 * Phạm Văn Á thực hiện
 */
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    products,
    count,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

/**
 * GET product by ID 
 * GET /api/products/:id
 * Phạm Văn Á thực hiện
 */
const getProductById = asyncHandler(async (req, res) => {
  /**
   * sản phẩm = tìm kiếm bằng Id của MongoDB
   */
  const product = await Product.findById(req.params.id);
  /**
   * Nếu tìm thấy sản phẩm thì trả về json sản phẩm đó
   * Ngược lại thì báo lỗi cho người dùng.
   */
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found | Không tìm thấy sản phẩm");
  }
});


/**
 * ADMIN - quản trị có quyền thực hiện 
 * DELETE delete product
 * DELETE /api/products/:id
 * Phạm Văn Á thực hiện
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // console.log(req.params.id);
  if (product) {
    await product.remove();
    res.json({
      message: "Product deleted",
    });
  } else {
    res.status(404);
    throw new Error("Product not found | Không tìm thấy sản phẩm");
  }
});

/**
 * Tạo mới 1 sản phẩm
 * ADMIN - quản trị có quyền
 * POST create product 
 * POST /api/products/
 * Phạm Văn Á thực hiện 28/3/2024
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample ",
    price: 0,
    user: req.user._id,
    image: "images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * ADMIN - quản trị có quyền
 * PUT update product
 * PUT /api/products/:id   
 * Phạm văn Á thực hiện
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Sản phẩm không tìm thấy!");
  }
});

/**
 * tạo đánh giá sản phẩm
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * Trả về sản phẩm có đánh giá cao, giới hạng 5 sản phẩm
 * GET /api/products/top
 * Tất cả điều có quyền xem
 * Phạm Văn Á thực hiện
 */
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({
      rating: -1,
    })
    .limit(5);

  res.json(products);
});

/**
 * Xuất các controller cho router xử dụng
 * Trong quá trình phân tích,thiết kế
 *  sẽ bổ sung thêm các tính năng cho ứng dụng
 * Phạm Văn Á thực hiện
 * Cập nhật 28/3/2024
 */
export {
  getProducts,
  getProductById,
  getTopProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
