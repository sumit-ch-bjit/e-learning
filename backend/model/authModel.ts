import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
        unique: true, // Ensures that each user has only one authentication record
    },
    role: { type: String, enum: ['Student', 'Instructor', 'Admin'], default: 'Student' },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const Auth = mongoose.model('Auth', authSchema)

export default Auth