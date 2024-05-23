import mongoose from "mongoose";

const BookDetails = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: ""
    },
    image: {
        type: Array,
        required: false,
        default: []
    },
    advanceBook: {
        type: Number,
        required: false,
        default: 0
    },
    qty: {
        type: Number,
        required: false,
        default: 0
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    category: {
        type: String,
        required: false,
        default: ""
    },
    isDeleted: {
        type: Number,
        required: false,
        default: 0
    },
},
    {
        timestamps: true
    }
)
const Book = new mongoose.model("Book", BookDetails)
export default Book;