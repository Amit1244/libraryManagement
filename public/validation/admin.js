import Joi from "joi";

export const book_add = async (req, res, next) => {
  try {
    const library_validation = Joi.object().keys({
      name: Joi.string().required(),
      qty: Joi.number().required(),
      image: Joi.string().optional(),
      description: Joi.string().required(),
      category: Joi.string().required(),
    });
    const { error } = library_validation.validate(req.body);
    if (error || error === null) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error");
  }
};

export const book_edit = async (req, res, next) => {
  try {
    const library_validation = Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      qty: Joi.number().required(),
      description: Joi.string().required(),
    });
    const { error } = library_validation.validate(req.body);
    if (error || error === null) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error");
  }
};

export const book_img_edit = async (req, res, next) => {
  try {
    const library_validation = Joi.object().keys({
      id: Joi.string().required(),
      imageId: Joi.string().required(),
    });
    const { error } = library_validation.validate(req.body);
    if (error || error === null) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error");
  }
};

export const book_remove = async (req, res, next) => {
  try {
    const library_validation = Joi.object().keys({
      id: Joi.string().required(),
    });
    const { error } = library_validation.validate(req.query);
    if (error || error === null) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error");
  }
};

export const add_category = async (req, res, next) => {
  try {
    const library_validation = Joi.object().keys({
      name: Joi.string().required(),
    });
    const { error } = library_validation.validate(req.body);
    if (error || error === null) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error");
  }
};

export const get_category = async (req, res, next) => {
  try {
    const library_validation = Joi.object().keys({
      page: Joi.number().required(),
      search: Joi.string().optional().allow(""),
      limit: Joi.number().required(),
    });
    const { error } = library_validation.validate(req.query);
    if (error || error === null) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error");
  }
};

export const edit_category = async (req, res, next) => {
  try {
    const library_validation = Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
    });
    const { error } = library_validation.validate(req.body);
    if (error || error === null) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error");
  }
};
