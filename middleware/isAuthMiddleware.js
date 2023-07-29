const jwt = require("jsonwebtoken");
require('dotenv').config();

const isAuth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ massage: 'Not authenticated.' });
    }
    const replaceToken = token.replace("Bearer ", "");
    let decoded;
    try {
        decoded = jwt.verify(replaceToken, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
    if (!decoded) {
        return res.status(401).json({ massage: 'Not authenticated.' });
    }
    req.user = decoded;
    next();
};

module.exports = isAuth;