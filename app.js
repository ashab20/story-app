// external import
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');




// internal import
const connectDB = require('./config/db');
const { formateDate, truncate, stripTags, editIcon} = require('./helpers/hbs.js');

// config the env 
dotenv.config({path: './config/config.env'});
require('./config/passport.js')(passport);
connectDB();

// initialling app
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// workimg for template engine hadnlebars
app.engine('.hbs',exphbs({helpers: {
    formateDate,
    truncate, 
    stripTags,
    editIcon,
},defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

// season
app.use(
    session({
    secret: 'kayboard cat',
    resave: false,
    saveUninitialized:false,
    store:  MongoStore.create({ mongoUrl: process.env.MONGO_URL,mongooseConnection: mongoose.connection }),
}))


// body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// passport middleqare
app.use(passport.initialize());
app.use(passport.session())


// set global variable
app.use(function (req,res,next){
    res.locals.user = req.user || null
    next();
});
// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// @Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

// // 404 not found handler
// app.use((req,res,next) => {
//     next(404);
// })

// // error Handler
// app.use( (err,req,res,next) =>{
//     res.status(404).json({
//         error: err
//     })
// })


const PORT = process.env.PORT || 5000

// server running
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));