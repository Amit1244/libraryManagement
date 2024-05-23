import Category from "../models/category.js";
import { addBooks, deleteBook, deleteCategory, editBookDetails, editBooks, editCategorytails, findBook, getBooks } from "../services/admin.js";

export const createBooks = async (req, res) => {
    const body = req.body;
    try {
        if (req.user && req.user.role == 1) {
            const findBooks = await findBook(body)
            if (findBooks && Object.keys(findBooks).length == 0) {
                const addBook = await addBooks(body, req.files)
                if (addBook) {
                    return res.json({ status: 200, success: true, msg: "Book added succesfully!", data: {} })
                }
                else {
                    return res.json({ status: 500, success: false, msg: "Book not added!", data: {} })
                }
            }
            else {
                return res.json({ status: 409, success: false, msg: "Book already added!", data: {} })
            }
        }
        else {
            return res.json({ status: 401, success: false, msg: "User is unAuthorized!", data: {} })
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}

export const editBook = async (req, res) => {
    const body = req.body;
    try {
        if (req.user && req.user.role == 1) {
            const editBookDetails = await editBooks(body)
            if (editBookDetails) {
                return res.json({ status: 200, success: true, msg: "Books details edit succesfully.", data: {} })
            }
            else {
                return res.json({ status: 500, success: false, msg: "Books details not edit!", data: {} })
            }
        }
        else {
            return res.json({ status: 401, success: false, msg: "User is unAuthorized!", data: {} })
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}

export const editImgBook = async (req, res) => {
    try {
        if (!req.file && Object.keys(req.file).length == 0) {
            return res.json({ status: 502, success: false, msg: "Image is required!" })
        }
        else {
            const updateBook = await editBookDetails(req.file, req.body.imageId, req.body.id)
            if (updateBook) {
                return res.json({ status: 200, success: true, msg: "Image edit succesfully." })
            }
            else {
                return res.json({ status: 500, success: false, msg: "Image not edit!" })
            }
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}

export const removeBook = async (req, res) => {
    const { id } = req.query;
    try {
        const removeBookData = await deleteBook(id)
        if (removeBookData) {
            return res.json({ status: 200, success: true, msg: "Book details remove succesfully.", data: {} })
        }
        else {
            return res.json({ status: 502, success: false, msg: "Book details not remove!", data: {} })
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}

export const addcategory = async (req, res) => {
    try {
        const find_category = await Category.findOne({ name: req.body.name })
        if (find_category == null) {
            const add_category = await Category.create(req.body)
            if (add_category) {
                return res.json({ status: 200, success: false, message: "Category add succesfully.", data: {} })
            }
            else {
                return res.json({ status: 500, success: false, message: "Category not add!", data: {} })
            }
        } else {
            return res.json({ status: 409, success: false, message: "Category already add.", data: {} })
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}

export const getcategory = async (req, res) => {
    try {
        let obj = {};
        if (req.query.search) {
            obj.name = { $regex: new RegExp(req.query.search, 'i') }
        }
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;
        const getCategory = await Category.find(obj).skip(skip).limit(limit)
        const count = await Category.countDocuments(obj)
        if (getCategory && getCategory.length > 0) {
            return res.json({ status: 200, success: true, message: "Category get succesfully.", data: { getCategory, count } })
        }
        else {
            return res.json({ status: 404, success: false, message: "Category not found!", data: {} })
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}

export const editCategory = async (req, res) => {
    try {
        const editCategory = await editCategorytails(req.body)
        if (editCategory) {
            return res.json({ status: 200, success: true, message: "Category edit succesfully.", data: {} })
        }
        else {
            return res.json({ status: 502, success: false, message: "Category not edit!", data: {} })
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}

export const removeCategory = async (req, res) => {
    try {
        const removeCategory = await deleteCategory(req.query.id)
        if (removeCategory) {
            return res.json({ status: 200, success: true, message: "Category remove succesfully.", data: {} })
        }
        else {
            return res.json({ status: 500, success: false, message: "Category not remove", data: {} })
        }
    } catch (error) {
        return res.json({ status: 500, success: false, message: "Internal server error!", data: {} })
    }
}