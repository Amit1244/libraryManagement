import mongoose from "mongoose";

const userDetails = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    mobile: {
        type: Number,
        required: false,
        default: 0
    },
    password: {
        type: String,
        required: false,
        default: ""
    },
    gender: {
        type: String,
        required: false,
        default: ""
    },
    address: {
        type: String,
        required: false,
        default: ""
    },
    favourite: {
        type: Array,
        required: false,
        default: []
    },
    profileImage: {
        type: String,
        required: false,
        default: ""
    },
    otp: {
        type: Number,
        default: 0
    },
    role: {
        type: Number,
        required: true,  // 0 - user , 1 - admin
        default: 0
    },
    isGoogleLogin: {
        type: Number,
        required: false,
        default: 0
    },
    isActive: {
        type: Number,
        required: false,
        default: 0
    },
    isDeleted: {
        type: Number,
        required: false,
        default: 0
    },
    isBlock: {
        type: Number,
        required: false,
        default: 0
    }
},
    {
        timestamps: true
    }
)
const User = new mongoose.model("User", userDetails)
export default User;