import mongoose from "mongoose";

const BookDetails = new mongoose.Schema({
    userName: {
        type: String,
        required: false,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: "",
        ref: "user"
    },
    day: {
        type: String,
        required: false,
    },
    status: {
        type: String,      // 1 - approve , 2 - reject
        required: false,
    },
    time: {
        type: String,
        required: false,
        default: "",
    },
    date: {
        type: String,
        required: false,
        default: "",
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: "",
        ref: "book"
    }
},
    {
        timestamps: true
    }
)
const BookRecord = new mongoose.model("BookRecord", BookDetails)
export default BookRecord;