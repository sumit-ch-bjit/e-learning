import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    profile: {
        firstName: { type: String },
        lastName: { type: String },
        bio: { type: String },
        avatar: { type: String }, // URL to user's profile picture
    },
    instructorProfile: {
        expertise: { type: String },
    },
});

const User = mongoose.model('User', userSchema);

export default User;