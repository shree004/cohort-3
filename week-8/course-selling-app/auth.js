const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const decoded = jwt.verify(token, JWT_USER_SECRET);

        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

function a_auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = {
    auth,
    a_auth 
};
