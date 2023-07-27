const Joi = require('joi');

exports.contractorLogin = async (req, res, next) => {
    const Schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(8).max(30).required().pattern(new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$')).message('password must contain 8 characters length ,two letters in Upper Case ,one Special Character ,two number and three letters in Lower Case'),
    });
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((errorDetail) => {
            return  {
                path: errorDetail.path[0],
                massage: errorDetail.message
            }
        });
        return res.status(400).json({
            errors: errors
        });
    }
    next();
};

exports.storeContractor = async (req, res, next) => {
    const Schema = Joi.object({
        first_name: Joi.string().alphanum().min(8).max(30).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(8).max(30).required().pattern(new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$')).message('password must contain 8 characters length ,two letters in Upper Case ,one Special Character ,two number and three letters in Lower Case'),
        address: Joi.string().min(8).max(30).required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
        phone: Joi.string().length(10).pattern(/^09\d{8}$/).required(),
        last_name: Joi.string().alphanum().min(8).max(30).required(),
        name: Joi.string().alphanum().min(8).max(30).required(),
    });
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((errorDetail) => {
            return  {
                path: errorDetail.path[0],
                massage: errorDetail.message
            }
        });
        return res.status(400).json({
            errors: errors
        });
    }
    next();
};

exports.storeMaterial = async (req, res, next) => {
    const Schema = Joi.object({
        name: Joi.string().alphanum().min(8).max(30).required(),
        unit_price: Joi.number().positive().greater(50).required(),
        qualification: Joi.string().alphanum().min(8).max(30).required(),
        category_id: Joi.number().required(),
        contractor_id: Joi.number().required(),
    });
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((errorDetail) => {
            return  {
                path: errorDetail.path[0],
                massage: errorDetail.message
            }
        });
        return res.status(400).json({
            errors: errors
        });
    }
    next();
};

exports.upateMaterial = async (req, res, next) => {
    const Schema = Joi.object({
        name: Joi.string().alphanum().min(8).max(30).required(),
        unit_price: Joi.number().positive().greater(50).required(),
        qualification: Joi.string().alphanum().min(8).max(30).required(),
    });
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((errorDetail) => {
            return  {
                path: errorDetail.path[0],
                massage: errorDetail.message
            }
        });
        return res.status(400).json({
            errors: errors
        });
    }
    next();
};

exports.storeCategory = async (req, res, next) => {
    const Schema = Joi.object({
        evaluation_type:  Joi.boolean().required(),
        name: Joi.string().alphanum().min(8).max(30).required(),
        parent_category_id: Joi.number().allow(null),
    });
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((errorDetail) => {
            return  {
                path: errorDetail.path[0],
                massage: errorDetail.message
            }
        });
        return res.status(400).json({
            errors: errors
        });
    }
    next();
};

exports.storeMainDocument = async (req, res, next) => {
    const Schema = Joi.object({
        contractor_id:  Joi.number().required(),
        comment: Joi.string().alphanum().min(8).max(30).required(),
    });
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((errorDetail) => {
            return  {
                path: errorDetail.path[0],
                massage: errorDetail.message
            }
        });
        return res.status(400).json({
            errors: errors
        });
    }
    next();
};


