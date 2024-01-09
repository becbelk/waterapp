require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override')

const layout = require('express-ejs-layouts');

const connectDb = require('./server/config/db');
const cookieParser = require('cookie-parser');
const session=require('express-session');
const mongoStore=require('connect-mongo');
const mainRouter = require('./server/router/main');
const adminRouter = require('./server/router/admin');

const port = process.env.PORT;
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_methode'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(session({
        secret: process.env.SessionSECRET,
        resave:false,
        saveUninitialized:true,
        store:mongoStore.create(
            {mongoUrl:process.env.DB_MONGO_URI,}
        )
          //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
    }
))



app.use(layout);
app.set('layout', './layouts/main_layout.ejs');
app.set('view engine', 'ejs');



app.use('/', adminRouter);
app.use('/', mainRouter);

app.listen(port, console.log(`listening at port:  ${port}`));
