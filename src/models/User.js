import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true, // removes extra spaces
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    profile: {
        type: String,
        required: false,
    },
    role: { 
        type: String, 
        default: "User" 
    },
    payment: {
        type: String,
        default: "Free"
    },
    friendsRequests: { 
        type: [String], 
        default: [] 
    },
    friends: { 
        type: [String], 
        default: [] 
    },
    friendsCalls: { 
        type: [String], 
        default: [] 
    }
}, { timestamps: true });

const Users = models.User || mongoose.model("User", userSchema);
export default Users;