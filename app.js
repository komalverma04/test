require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');
const app = express();
const port = 3000 || process.env.PORT;
connectDB(); // connecting DB

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
   secret: 'cat dog',
   resave: false,
   saveUninitialized: true,
   store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
   }),
}));
app.use(express.static("public"));
 
 
 app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

 

 
 app.use("/",require('./server/routes/main'));
 app.use("/",require('./server/routes/admin'));
 app.listen(port,()=>{
    console.log(`Server is running on ${port} port.`);
 });