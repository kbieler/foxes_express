const express = require('express');
const path = require('path');
const { connectDB } = require('./src/db');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');

//create instance of express app
const app = express();


connectDB();
dotenv.config();

//set up templating engine/view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/src/views/pages'));

require("./src/routes")(app)

app.listen(process.env.PORT, () => {
    console.log(`Server now running on PORT ${process.env.PORT}`)
});



// middleware
app.use((req, res, next)=>{
    console.log(`Request received at: ${Date()}`);
    next();
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

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




//show app where to find static(public) files
app.use(express.static(path.join(__dirname, 'public')));