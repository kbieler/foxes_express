const express = require('express');
const path = require('path');
const { connectDB } = require('./src/db');
const dotenv = require('dotenv');

//create instance of express app
const app = express();
const port = 3000;

connectDB();
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server now running on PORT ${process.env.PORT}`)
});

//set up templating engine/view engine
app.set('view engine', 'ejs');

// middleware
app.use((req, res, next)=>{
    console.log(`Request received at: ${Date()}`);
    next();
});

//routes
app.get('/', (req, res)=> {
    //res.send('Hello, Foxes!');
    res.render('pages/index');
});

app.get('/login', (req, res)=>{
    res.render('pages/login');
});

app.get('/profile', (req, res)=>{
    res.render('pages/profile');
});

app.get('/register', (req, res)=>{
    res.render('pages/register');
});

app.get('/user', (req, res)=>{
    res.render('pages/user');
});


//dynamic routing
    //method1: regex
app.get('/[A-Za-z]*reynolds', (req, res) =>{
    res.send('This is a member of the Reynolds family.');
});
    //method2: variables in the url
app.get('/:actor/frank/:character', (req, res) => {
    console.log(req.params);
    res.send('Which Frank Reynolds character are we talking about?');
});

//show app where to find static(public) files
app.use(express.static(path.join(__dirname, 'public')));