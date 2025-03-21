const ejsMate = require('ejs-mate');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const ErrorHandler = require('./utils/ErrorHandler');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const app = express();



//mongod
mongoose.connect('mongodb+srv://brynnnn12:MamikHaryono@mongodb.xx2ht.mongodb.net/?retryWrites=true&w=majority&appName=mongoDb')
    .then(() => {
        console.log('Connected to MongoDB...')
    }).catch((err) => {
        console.log('Could not connect to MongoDB...')  
    });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
    }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.search = req.query.search || ''; // Pastikan selalu ada nilai defaul
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
    });





app.get('/home', (req, res) => {
  res.render('home')
})


app.use('/', require('./routes/auth'))
app.use('/places', require('./routes/place'));
app.use('/places/:place_id/reviews', require('./routes/reviews'));



app.all('*',(req, res, next) => {
    next(new ErrorHandler());
})

app.use((err, req, res, next) => {
    const {statusCode = 500} =err;
    if (!err.message) err.message = 'Oh no, something went wrong';
    res.status(statusCode).render('error', {err});
  })
  
app.listen(3000, () => {
    console.log('Server is running on http://127.0.0.1:3000');
})
