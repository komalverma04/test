require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const app = express();
const port = 3000 || process.env.PORT;
connectDB(); // connecting DB
app.use(express.static("public"));
 
 
 app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

 

 
 app.use("/",require('./server/routes/main'));
 app.listen(port,()=>{
    console.log(`Server is running on ${port} port.`);
 });