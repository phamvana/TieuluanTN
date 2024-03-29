import mongoose from "mongoose";

/**
 * Công việc cần làm: Phân tích và thiết kế hệ thống Studio Như
 * order cần lưu những thông tin 
 * ===========================
 * Thực hiện: Phạm Văn Á
 * Ngày 29/3/2024
 */

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    orderItems: [{
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
    },],

    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        ward: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },


    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        update_time: {
            type: String,
        },
        email_address: {
            type: String,
        },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;