import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //thông báo 
        console.log(`| Kết nối dữ liệu thành công ! |`);
        console.log(`|------------------------------|`.red);
        console.log(`Morgan hoạt động ghi lại logger ...`.red);
        // console.log(
        //     `MongoDB is connected: ${conn.connection.host}`.white
        // );
    } catch (error) {
        console.log(`ERROR: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

export default connectDB;