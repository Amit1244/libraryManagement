import mongoose from "mongoose";

const CategoryDetails = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: ""
    }
},
    {
        timestamps: true
    }
)
const Category = new mongoose.model("Category", CategoryDetails)
export default Category;