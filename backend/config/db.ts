// src/db.js
import mongoose, { mongo } from "mongoose";

// Replace 'mongodb://localhost:27017/your-database-name' with your MongoDB connection URI.
// const mongoURI =
//   process.env.MONGO_URI

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/e-learning-test"

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to mongodb");
    } catch (error) {
        console.log('could not connect to mongodb', error)
    }
};

export default connectDB;