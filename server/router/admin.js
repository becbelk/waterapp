const express = require('express');
const auth=require('./auth');
const router = express.Router();
const admin = require('../controllers/admin/admin_controller');

//const mck=require('../misc/mockdata');

//if the token already exist it will pass through
router.get('/', admin.homepage,);
router.post('/signin', admin.signin,);

router.get('/register', admin.registerForm,);
router.post('/register', admin.registerPost);


router.get('/dashBoard', auth.authenticate,admin.dashBoard);
router.post('/dashBoard/:id', auth.authenticate,admin.editUserInfo);


//mck.createUser('agent','azerty');
module.exports=router;
