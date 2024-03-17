const express = require('express');
const router = express.Router();

const User = require('../../model/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;
const splashLayout = '../views/layouts/splash_layout.ejs';
/**
 * sign in and reigister page
 */

exports.homepage = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log('[*]->[admin router]: home page token ')

        if (token) {
        console.log('[*]->[admin router]: is  token ', token)

            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decode.userId;
            console.log('[*]->[admin router]:{@/homepage}');

            res.redirect('/home');
        }
        console.log('[*]->[admin router]: {@/admin/signin}');
        const title = 'إدارة الحساب';
        res.render('admin/read/signin', { title, layout: splashLayout });
    } catch (error) {
        res.redirect('/home');
        console.log('[*]->[admin router]: ',error)
    }

}
/** post sign in request
 * 
 */
exports.signin = async (req, res) => {
    try {
        console.log('[*]->[admin router]: Sign in page');

        const { username, password } = req.body;

        let user = await User.findOne({ username });
        if (!user) {
            console.log('[*]->[admin router]: Sign in page: user [', username, '] not found in db');
            return res.status(401).json({ message: 'invalid credentials' });
        }
        console.log('[*]->[admin router]: Sign in page: user [', username, '] is found in db');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.cookie('token', token, { httpOnly: true })
        res.redirect('/home');

    } catch (e) {
        console.log('->[admin router]:',e)
    }

}
    /** get register in request
     * 
     */
exports.registerForm = async (req, res) => {
    try {
        title = 'فتح حساب'
        console.log('[*]->[admin router]: regisister Form');
        res.render('admin/register', { title, layout: splashLayout })
    } catch (e) {
        console.log(e);
    }
}

    /** post register  request
     * 
     */

exports.registerPost = async (req, res) => {
    try {
        console.log(req.body);
        username = req.body.username;
        password0 = req.body.password[0];
        password1 = req.body.password[1];
        if (password0 === password1) {
            console.log('password0', password0)
            password = await bcrypt.hash(password0, salt);
            const user = await User.create({ username, password });
            const token = jwt.sign({ userId: username }, process.env.JWT_SECRET);
            res.cookie('token', token, { HttpOnly: true });
            res.redirect('/home');
        }
    } catch (e) {
        console.log(e);
    }
}
/** get dashboard */
exports.dashBoard = async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            title = 'تغيير بيانات المستخدم'
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decode.userId);
            //console.log('user=',user);
            res.render('admin/dashboard', { title, user })
        } catch (e) {
            console.log(e);
        }
    }
    else {
        res.status(401).json({ messaege: 'unauthorized' })
    }

}
/** POST dashboard */
exports.editUserInfo = async (req, res) => {
    const id = req.params.id
    const token = req.cookies.token;
    if (token)
        try {
            username = req.body.username;
            password = await bcrypt.hash(req.body.password, salt);
            const user = await User.updateOne({ _id: id }, { username, password });
            const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
            res.cookie('token', token, { httÔnly: true });
            res.redirect('/home');
        } catch (e) {
            console.log(e);
        }

    else {
        res.status(401).json({ messaege: 'unauthorized' })
    }
}