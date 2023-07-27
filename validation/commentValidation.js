const Joi = require('joi');

exports.storeComment = async (req, res, next) => {
    const Schema = Joi.object({
        text: Joi.string().min(8),
        owner_id: Joi.number().required(),
        material_id: Joi.number().required(),
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

exports.updateComment = async (req, res, next) => {
    const Schema = Joi.object({
        text: Joi.string().min(8),
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