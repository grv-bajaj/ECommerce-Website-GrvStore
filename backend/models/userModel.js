import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
// This code defines a Mongoose schema for a User model, which includes fields for username, email, password, and an isAdmin flag. The schema also includes timestamps for created and updated times.