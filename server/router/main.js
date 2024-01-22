const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main_controller');
const auth=require('./auth')
//const src=require('./real'); real database in json 
//const mk=require('../misc/mockdata.js');

const list=require("../controllers/read/list.js")
const home=require("../controllers/home.js")
const print=require("../controllers/read/print.js")
const edit=require("../controllers/read/one/edit.js")
const update=require('../controllers/update/one/consumer.js');
const create=require('../controllers/create/create')
const display1=require('../controllers/read/display_one');
const del=require('../controllers/delete/delete')
const api=require('../controllers/read/getall')

/**
 * get home page
 * 
 */

router.get('/home',auth.authenticate,home.home)
router.get('/view-all',auth.authenticate,list.show);
router.post('/search', auth.authenticate,list.show);

router.get('/cancel',auth.authenticate, list.reset);


router.post('/save-row', auth.authenticate, update.one);
//router.post('/edit-one',auth.authenticate, update.byId);



//router.get('/consumer/:id', auth.authenticate,display1.showConsumerDetails);




//router.get('/new',auth.authenticate, create.newConsumerForm);
router.post('/new',auth.authenticate, create.saveNewConsumer);



//home page of print
router.get('/print', auth.authenticate,print.printePage); 
router.get('/printList', auth.authenticate,print.printList);
router.get('/printInvoices', auth.authenticate,print.printInvoices);



router.get('/about', auth.authenticate,mainController.about);

router.get('/logout', mainController.logout);



router.post('/delete',auth.authenticate,del.deleteOne );

router.get('/editList',  auth.authenticate,edit.editList);
router.post('/editList',  auth.authenticate,edit.editList);
//router.post('/search',auth.authenticate,edit.search)//todo not good

router.get('/getall',auth.authenticate,api.getall)



module.exports = router;