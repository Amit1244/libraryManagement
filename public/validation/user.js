import Joi from "joi"

export const signup_user = async (req, res, next) => {
    try {
        const library_validation = Joi.object().keys({
            name: Joi.string().required(),
            mobile: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required().messages({
                'number.min': 'Mobile number should be 10 digit.',
                'number.max': 'Mobile number should be 10 digit'
            }),
            email: Joi.string().email().required(),
            // gender: Joi.string().required(),
            address: Joi.string().required(),
            password: Joi.string().min(4).max(20).required().messages({
                'string.min': 'Password must be at least 4 characters long!',
                'string.max': 'Password cannot be longer than 20 characters!',
                'string.empty': 'Password is required!',
            }),
            cpassword: Joi.string().min(4).max(20).required().messages({
                'string.min': 'Confirm password must be at least 4 characters long!',
                'string.max': 'Confirm password cannot be longer than 20 characters!',
                'string.empty': 'Confirm password is required!',
            }),
        })
        const { error } = library_validation.validate(req.body);
        if (error || error === null) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: error.message,
            })
        } else {
            next()
        }
    } catch (error) {
        console.log("error");
    }
}

export const signIn_user = async (req, res, next) => {
    try {
        const library_validation = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).max(20).required().messages({
                'string.min': 'Password must be at least 4 characters long!',
                'string.max': 'Password cannot be longer than 20 characters!',
                'string.empty': 'Password is required!',
            })
        })
        const { error } = library_validation.validate(req.body);
        if (error || error === null) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: error.message,
            })
        } else {
            next()
        }
    } catch (error) {
        console.log("error");
    }
}

export const otp_verify = async (req, res, next) => {
    try {
        const library_validation = Joi.object().keys({
            otp: Joi.number().required(),
            email: Joi.string().email().required()
        })
        const { error } = library_validation.validate(req.body);
        if (error || error === null) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: error.message,
            })
        } else {
            next()
        }
    } catch (error) {
        console.log("error");
    }
}

export const get_books = async (req, res, next) => {
    try {
        const library_validation = Joi.object().keys({
            page: Joi.number().required(),
            limit: Joi.number().required(),
            category: Joi.string().optional().allow(""),
            name: Joi.string().optional().allow(""),
        })
        const { error } = library_validation.validate(req.query);
        if (error || error === null) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: error.message,
            })
        } else {
            next()
        }
    } catch (error) {
        console.log("error");
    }
}

export const favourite_books = async (req, res, next) => {
    try {
        const library_validation = Joi.object().keys({
            bookId: Joi.string().required(),
        })
        const { error } = library_validation.validate(req.body);
        if (error || error === null) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: error.message,
            })
        } else {
            next()
        }
    } catch (error) {
        console.log("error");
    }
}

export const advance_books_booked = async (req, res, next) => {
    try {
        const library_validation = Joi.object().keys({
            bookId: Joi.string().required(),
            days: Joi.string().required()
        })
        const { error } = library_validation.validate(req.body);
        if (error || error === null) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: error.message,
            })
        } else {
            next()
        }
    } catch (error) {
        console.log("error");
    }
}