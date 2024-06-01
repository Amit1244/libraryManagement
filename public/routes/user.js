import { Router } from "express";
import { advance_books_booked, favourite_books, get_books, otp_verify, signIn_user, signup_user } from "../validation/user.js";
import { advanceBook, favouriteBook, getBook, getBookDetails, getFavoriteBook, removeFavBooks, userLogin, userOtpVerify, userRegister } from "../controllers/user.js";
import { verifytoken } from "../utills/jwt.helper.js";

const router = new Router();

// User signup
router.post("/signup", signup_user, userRegister)
router.post("/signIn", signIn_user, userLogin)
router.post("/otpVerify", otp_verify, userOtpVerify)

// Get books details
router.get("/getBook", verifytoken, get_books, getBook)

// Favourite book
router.post("/favouriteBook", verifytoken, favourite_books, favouriteBook)
router.get("/getFavouriteBook", verifytoken, get_books, getFavoriteBook)
router.put("/removeFavourite", verifytoken, favourite_books, removeFavBooks)

// Advance booked book
router.post("/advancedBook", verifytoken, advance_books_booked, advanceBook)
router.get("/getBookDetails", verifytoken, get_books, getBookDetails)

export default router; 