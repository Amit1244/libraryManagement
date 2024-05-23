import { commonSendResponse, encryptPassword } from "../common/servicesResponse.js"
import Book from "../models/book.js"
import User from "../models/user.js"
import { emailTemplate } from "../templates/email.js"
import { ObjectId } from "mongodb"

// Find user
export const findUser = async (obj, select) => {
    try {
        const response = await User.findOne(obj).select(select)
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}

// Add/Create user 
export const addUser = async (obj) => {
    try {
        obj.password = await encryptPassword(obj.password)
        obj.otp = Math.floor(Math.random() * 900000) + 100000;
        const response = await User.create(obj)
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}


// Send mail to user for email verification
export const sendMail = async (email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: "traveldateweb@gmail.com",
                pass: process.env.GOOGLE_FACTOR_AUTHENTICATION,
            },
        });

        const info = await transporter.sendMail({
            from: 'traveldateweb@gmail.com',
            to: email,
            subject: "Password",
            html: emailTemplate(email, password),
        });
        if (info) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return error
    }
}

// Edit user details
export const editUser = async (id) => {
    try {
        const response = await User.findByIdAndUpdate({ _id: id }, { isActive: 1 })
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}

// export const find Book details
export const findBook = async (id) => {
    try {
        const response = await Book.findById({ _id: id })
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}

// add to favourite
export const addTofavourite = async (id, bookId) => {
    try {
        const response = await User.findByIdAndUpdate({ _id: id }, { $addToSet: { favourite: bookId } })
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}

// get favourite book
export const favouriteBooks = async (id, name, skip, limit) => {
    try {
        const findBook = await User.findById({ _id: id })
        const bookIds = findBook && findBook?.favourite.map(obj => obj);
        let obj = {}
        if (name && name !== "") {
            obj.name = { $regex: new RegExp(name, 'i') }
        }
        obj._id = { $in: bookIds }
        const response = await Book.find(obj).skip(skip).limit(limit)
        const count = await Book.countDocuments(obj)
        return commonSendResponse(response, count)
    } catch (error) {
        return error
    }
}

// Remove books from favourite
export const removeFromFavourite = async (_id, bookId) => {
    try {
        const response = await User.findByIdAndUpdate(
            { _id },
            { $pull: { favourite: bookId } }
        )
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}

// Advance book get
export const advanceGetBook = async (bookId) => {
    try {
        const response = await Book.findByIdAndUpdate({ _id: bookId }, { $inc: { advanceBook: +1 } })
        return commonSendResponse(response)
    } catch (error) {
        return error
    }
}