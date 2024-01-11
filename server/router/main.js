const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main_controller');
const auth=require('./auth')
//const src=require('./real.js'); real database in json 
const mk=require('./mockdata.js');

const list=require("../controllers/read/list.js")
const home=require("../controllers/home.js")
const print=require("../controllers/read/print.js")
const edit=require("../controllers/update/edit.js")
const update=require('../controllers/update/update.js')
const create=require('../controllers/create/create.js')
const display1=require('../controllers/read/display_one.js');
const del=require('../controllers/delete/delete.js')
const api=require('../controllers/read/getall.js')

/**
 * get home page
 * 
 */

//filler.insertDatas(src.db);

router.get('/home',auth.authenticate,home.home)

router.get('/list',auth.authenticate, list.list);
router.post('/list',auth.authenticate, list.list);



router.get('/consumer/:id', auth.authenticate,display1.showConsumerDetails);


router.get('/new',auth.authenticate, create.newConsumerForm);
router.post('/new',auth.authenticate, create.saveNewConsumer);
//home page of print
router.get('/print', auth.authenticate,print.printePage); 
router.get('/printList', auth.authenticate,print.printList);
router.get('/printInvoices', auth.authenticate,print.printInvoices);



router.get('/about', auth.authenticate,mainController.about);

//router.post('/searchAddress', auth.authenticate,mainController.searchAddress);
router.post('/search', auth.authenticate,mainController.search);
router.get('/logout', mainController.logout);



router.post('/delete/:id',auth.authenticate,del.deleteOne );

router.get('/editList',  auth.authenticate,edit.editList);
router.post('/editList',  auth.authenticate,edit.editList);
router.post('/searchByNo',auth.authenticate,edit.searchByNo)
router.get('/edit/:id',auth.authenticate, edit.editFormForConsumer);


router.post('/saveRow', auth.authenticate, update.saveRow);
router.post('/new',auth.authenticate, update.editAndSaveConsumer);//! what is this????? نسيتها
router.post('/edit/:id',auth.authenticate, update.editAndSaveConsumer);

router.get('/getall',auth.authenticate,api.getall)



module.exports = router;