const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

function auth(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = {
    auth : auth
};