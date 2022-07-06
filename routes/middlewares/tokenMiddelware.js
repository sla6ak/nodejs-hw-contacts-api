const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const { PASSWORD_KEY } = process.env;

const tokenMiddelware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN" это строка поэтому распарсим ее в массив на 2 слова - и вытянем елемент 1
        if (!token) {
            return res.status(401).json({ message: "Your token is no validate, login please", response: null });
        }
        const tokenDecoder = jwt.verify(token, PASSWORD_KEY); // что шифровали то и вытянем
        req.userId = tokenDecoder.id;
        req.token = token;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Your token is no validate, login please", response: null, error: error });
    }
};

module.exports = {
    tokenMiddelware,
};
