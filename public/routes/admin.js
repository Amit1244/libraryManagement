import { Router } from "express";
import { addcategory, createBooks, editBook, editCategory, editImgBook, getcategory, removeBook, removeCategory } from "../controllers/admin.js";
import { verifytoken } from "../utills/jwt.helper.js";
import { add_category, book_add, book_edit, book_img_edit, book_remove, edit_category, get_category } from "../validation/admin.js";
import userImage from "../middelware/multer.js";

const router = new Router()

// CRUD book details
router.post("/addBook", userImage.array('image'), verifytoken, book_add, createBooks)
router.put("/editBook", verifytoken, book_edit, editBook)
router.put("/editBookImage", userImage.single('image'), verifytoken, book_img_edit, editImgBook)
router.delete("/removeBook", verifytoken, book_remove, removeBook)

// Add category of books
router.post("/addCategory", verifytoken, add_category, addcategory)
router.get("/getCategory", verifytoken, get_category, getcategory)
router.put("/editCategory", verifytoken, edit_category, editCategory)
router.delete("/removeCategory", verifytoken, book_remove, removeCategory)
export default router;