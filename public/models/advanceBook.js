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
const Book = new mongoose.model("Book", BookDetails)
export default Book;