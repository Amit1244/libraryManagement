import { decryptPassword } from "../common/servicesResponse.js";
import { getBooks } from "../services/admin.js";
import {
  addTofavourite,
  addUser,
  advanceGetBook,
  editUser,
  favouriteBooks,
  findBook,
  findUser,
  removeFromFavourite,
  sendMail,
} from "../services/user.js";
import { authToken } from "../utills/jwt.helper.js";

// user register
export const userRegister = async (req, res, next) => {
  const { cpassword, password, email } = req.body;
  try {
    const isAlreadyExist = await findUser(
      { email: email },
      { role: 0, isDeleted: 0, isBlock: 0, createdAt: 0, updatedAt: 0 }
    );
    if (isAlreadyExist) {
      if (isAlreadyExist.isActive == 1) {
        const mailSend = sendMail({ email, password });
        if (mailSend) {
          return res.json({
            status: 200,
            success: false,
            msg: "Mail send for verification.",
            data: {},
          });
        } else {
          return res.json({
            status: 500,
            success: false,
            msg: "Invalid mail id!",
            data: {},
          });
        }
      } else {
        return res.json({
          status: 409,
          success: false,
          msg: "User already registered!",
          data: {},
        });
      }
    } else {
      if (password == cpassword) {
        const createUser = await addUser(req.body);
        if (createUser) {
          const mailSend = sendMail({ email, password });
          if (mailSend) {
            return res.json({
              status: 200,
              success: true,
              msg: "User register succesfully.",
              data: {},
            });
          } else {
            return res.json({
              status: 500,
              success: false,
              msg: "Invalid mail id!",
              data: {},
            });
          }
        } else {
          return res.json({
            status: 500,
            success: false,
            msg: "User not register!",
            data: {},
          });
        }
      } else {
        return res.json({
          status: 502,
          success: false,
          msg: "Password and confirm password not match.",
          data: {},
        });
      }
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    }).message;
  }
};

// user login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let isLogin = await findUser({ email: email });
    console.log("isLogin", isLogin, email);
    if (isLogin && isLogin.isActive == 1) {
      const decryptPasswords = await decryptPassword(isLogin.password);
      if (decryptPasswords == String(password)) {
        let findUserData = await findUser(
          { email: email },
          {
            isDeleted: 0,
            isBlock: 0,
            createdAt: 0,
            updatedAt: 0,
            password: 0,
          }
        );
        findUserData = JSON.parse(JSON.stringify(findUserData));
        findUserData.token = await authToken(isLogin);
        return res.json({
          status: 200,
          success: true,
          msg: "User login succesfully.",
          data: findUserData,
        });
      } else {
        return res.json({
          status: 505,
          success: false,
          msg: "Please enter valid password!",
          data: {},
        });
      }
    } else {
      return res.json({
        status: 404,
        success: false,
        msg: "Please first registerd!",
        data: {},
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    });
  }
};

// Verify otp
export const userOtpVerify = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const findUserData = await findUser({ email, otp: otp });
    if (findUserData && Object.keys(findUserData).length > 0) {
      const activeUser = await editUser(findUserData?._id, email);
      let getUser = await findUser(
        { email, otp: otp },
        {
          role: 0,
          isDeleted: 0,
          isBlock: 0,
          createdAt: 0,
          updatedAt: 0,
          password: 0,
        }
      );
      getUser = JSON.parse(JSON.stringify(getUser));
      getUser.token = await authToken(getUser);
      if (activeUser) {
        return res.json({
          status: 200,
          success: false,
          msg: "OTP verify succesfully.",
          data: getUser,
        });
      } else {
        return res.json({
          status: 500,
          success: false,
          msg: "Please enter valid otp!",
          data: {},
        });
      }
    } else {
      return res.json({
        status: 500,
        success: false,
        msg: "Please enter valid otp!",
        data: {},
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    });
  }
};

// Get all books
export const getBook = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const name = req.query.name;
    const getBookDetails = await getBooks(limit, skip, category, name);
    if (getBookDetails && Object.keys(getBookDetails).length > 0) {
      return res.json({
        status: 200,
        success: true,
        msg: "Books get succesfully.",
        data: {
          getBookDetails: getBookDetails.data,
          count: getBookDetails.obj,
        },
      });
    } else {
      return res.json({
        status: 404,
        success: false,
        msg: "Books not get!",
        data: {},
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    });
  }
};

// Add favourite book
export const favouriteBook = async (req, res) => {
  const { bookId } = req.body;
  try {
    const findBookDetail = await findBook(bookId);
    if (findBookDetail && Object.keys(findBookDetail).length == 0) {
      return res.json({
        status: 502,
        success: false,
        msg: "Please enter valid book id!",
        data: {},
      });
    } else {
      const favouritebook = await addTofavourite(req.user._id, bookId);
      if (favouritebook) {
        return res.json({
          status: 200,
          success: true,
          msg: "Books added from favourite succesfully.",
          data: {},
        });
      } else {
        return res.json({
          status: 502,
          success: false,
          msg: "Please enter valid book detail!",
          data: {},
        });
      }
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    });
  }
};

// get favourite book details
export const getFavoriteBook = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const getBook = await favouriteBooks(
      req.user._id,
      req.query.name,
      skip,
      limit
    );
    if (
      getBook &&
      Object.keys(getBook).length > 0 &&
      getBook?.data?.length > 0
    ) {
      return res.json({
        status: 200,
        success: false,
        msg: "Book get succesfully.",
        data: getBook,
      });
    } else {
      return res.json({
        status: 404,
        success: false,
        msg: "Books not get!",
        data: {},
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    });
  }
};

// Remove from favourite
export const removeFavBooks = async (req, res) => {
  try {
    const isRemove = await removeFromFavourite(req.user._id, req.body.bookId);
    if (isRemove) {
      return res.json({
        status: 200,
        success: true,
        msg: "Books remove from favourite succesfully.",
        data: {},
      });
    } else {
      return res.json({
        status: 502,
        success: false,
        msg: "Please enter valid data!",
        data: {},
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    });
  }
};

// Advance by book
export const advanceBook = async (req, res) => {
  try {
    const getBook = await findBook(req?.body?.bookId);
    if (getBook) {
      if (+getBook.advanceBook == +getBook.qty) {
        return res.json({
          status: 409,
          success: false,
          message: "All book already booked!",
          data: {},
        });
      } else {
        const advanceBook = await advanceGetBook(req?.body?.bookId);
        if (advanceBook) {
          return res.json({
            status: 200,
            success: false,
            message: "Advance book booked succesfully.",
            data: {},
          });
        } else {
          return res.json({
            status: 500,
            success: false,
            message: "Advance book not booked!",
            data: {},
          });
        }
      }
    } else {
      return res.json({
        status: 502,
        success: false,
        message: "Please enter valid book id!",
        data: {},
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error!",
      data: {},
    });
  }
};
