require('dotenv').config();
const express = require('express');

const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));
app.use(session({
   secret: 'cat dog',
   resave: false,
   saveUninitialized: false,
   store: MongoStore.create({
      mongoUrl: `${process.env.MONGODB_URI}/test`
   }),
}));
app.use(express.static("public"));
 
 
 
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

 

 
 app.use("/",require('./server/routes/main'));
 app.use("/",require('./server/routes/admin'));
 app.listen(port,()=>{
    console.log(`Server is running on ${port} port.`);
 });