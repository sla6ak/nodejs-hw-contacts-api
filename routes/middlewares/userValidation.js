const joi = require("joi");

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: joi.string().min(6).max(15).required(),
    });
    const resultValidation = schema.validate(req.body);
    if (resultValidation.error) {
        return res.status(400).json({ message: `No validate${resultValidation.error}`, response: null });
    }
    next();
};

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: joi.string().min(6).max(15).required(),
    });
    const resultValidation = schema.validate(req.body);
    if (resultValidation.error) {
        return res.status(400).json({ message: "No validate", response: null });
    }
    next();
};

module.exports = {
    loginValidation,
    signupValidation,
};
