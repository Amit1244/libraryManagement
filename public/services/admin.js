import { commonSendResponse } from "../common/servicesResponse.js"
import Book from "../models/book.js"
import { ObjectId } from "mongodb"
import Category from "../models/category.js"
import BookRecord from "../models/advanceBook.js"

// Add books dagta
export const addBooks = async (body, files) => {
    try {
        body.image =
            files &&
            files.map((ele) => {
                return {
                    _id: new ObjectId(),
                    fileName: ele.filename,
                };
            });
        const response = await Book.create(body);
        return commonSendResponse(response);
    } catch (error) {
        return error;
    }
};

// find books data
export const findBook = async (body) => {
    try {
        const response = await Book.findOne({
            name: { $regex: new RegExp(body.name, "i") },
        });
        return commonSendResponse(response);
    } catch (error) {
        return error;
    }
};

// Get all books details
export const getBooks = async (limit, skip, category, name) => {
    try {
        let obj = {};
        if (category && category !== "") {
            obj.category = { $regex: new RegExp(category, "i") };
        }
        if (name && name !== "") {
            obj.name = { $regex: new RegExp(name, "i") };
        }
        obj.isDeleted = 0;
        const response = await Book.find(obj)
            .select({ isDeleted: 0 })
            .skip(skip)
            .limit(limit);
        const count = await Book.countDocuments(obj);
        return commonSendResponse(response, count);
    } catch (error) {
        return error;
    }
};

// edit books details
export const editBooks = async (body) => {
    try {
        const response = await Book.findByIdAndUpdate({ _id: body.id }, body);
        return commonSendResponse(response);
    } catch (error) {
        return error;
    }
};

// edit books details
export const editBookDetails = async (file, imageId, id) => {
    try {
        const response = await Book.findOneAndUpdate(
            { _id: id, "image._id": new ObjectId(imageId) },
            { "image.$.fileName": file.filename }
        );
        return commonSendResponse(response);
    } catch (error) {
        return error;
    }
};

// Delete book details
export const deleteBook = async (id) => {
    try {
        const response = await Book.findByIdAndDelete({ _id: id });
        return commonSendResponse(response);
    } catch (error) {
        return error;
    }
};

// edit category details
export const editCategorytails = async (body) => {
    try {
        const response = await Category.findByIdAndUpdate(
            { _id: body.id },
            { name: body.name }
        );
        return commonSendResponse(response);
    } catch (error) {
        return error;
    }
};

// Delete category details
export const deleteCategory = async (id) => {
    try {
        const response = await Category.findByIdAndDelete({ _id: id })
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}

// edit advance booked book status
export const editBookStatus = async (body, bookId) => {
    try {
        if (body.status == 2) {
            await Book.findByIdAndUpdate({ _id: bookId.bookId }, { $inc: { advanceBook: -1 } })
        }
        const response = await BookRecord.findByIdAndUpdate({ _id: body.id }, { status: body.status })
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}

// get book details
export const getBookDetails = async (body) => {
    try {
        const response = await BookRecord.findById({ _id: body.id })
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}
