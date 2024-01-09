
const jwt = require('jsonwebtoken');
const context = require('./context');
const bcrypt = require('bcrypt');


exports.authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized operation' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.userId;
        context.context.username=req.userId;//todo: ****
        res.cookie("username",req.userId),
        next();

    } catch (error) {
        res.status(401).json({ message: '[*] {authenticate} Error exception Unauthorized' });
    }
}



exports.deleteConfirmation = async (req, res, next) => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.userId;
        context.context.username=req.userId;//todo: ****
        res.cookie("username",req.userId),
        next();

    } catch (error) {
        res.status(401).json({ message: '[*] {authenticate} Error exception Unauthorized' });
    }
}
