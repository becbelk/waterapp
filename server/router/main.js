const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main_controller');
const auth=require('./auth')
//const src=require('./real'); real database in json 
//const mk=require('../misc/mockdata.js');

const list=require("../controllers/consumer/read/list.js")
const home=require("../controllers/home.js")
const print=require("../controllers/consumer/read/print.js")
const edit=require("../controllers/consumer/read/one/edit.js")
const update=require('../controllers/consumer/update/one/consumer.js');
const create=require('../controllers/consumer/create/create')
const display1=require('../controllers/consumer/read/display_one');
const del=require('../controllers/consumer/delete/delete')
const api=require('../controllers/consumer/read/getall')
const counter=require('../controllers/counter/read')

/**
 * get home page
 * 
 */

router.get('/home',auth.authenticate,home.home)
// *  Consuer [Read]
router.get('/view-all',auth.authenticate,list.show);
/**
 *  Consuer [Update]
 * 
 */
router.get('/search', auth.authenticate,list.show);
router.get('/edited', auth.authenticate,list.edited);
router.get('/unedited', auth.authenticate,list.unedited);

router.get('/cancel',auth.authenticate, list.reset);


router.post('/save-row', auth.authenticate, update.one);

router.get('/get-counter', auth.authenticate,counter.getNo);

// Consumer [Create]

router.post('/new',auth.authenticate, create.newConsumer);



//home page of print
router.get('/print', auth.authenticate,print.main); 
router.get('/print-list', auth.authenticate,print.printList);
router.get('/print-invoices', auth.authenticate,print.printInvoices);






router.get('/about', auth.authenticate,mainController.about);
router.get('/logout', mainController.logout);



router.post('/delete',auth.authenticate,del.deleteOne );

router.get('/editList',  auth.authenticate,edit.editList);
router.post('/editList',  auth.authenticate,edit.editList);
//router.post('/search',auth.authenticate,edit.search)//todo not good

router.get('/getall',auth.authenticate,api.getall)



module.exports = router;