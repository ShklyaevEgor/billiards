const express = require("express");
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const { EUCJPMS_JAPANESE_CI } = require("mysql/lib/protocol/constants/charsets");

dotenv.config({
    path:'./.env'
})

const app = express();
const db=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({extended:false}));
app.use(express.json()); 

app.set('view engine','hbs');

db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL connected...")
    }
})

//Define routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5000, () => {
        console.log("server start in Port 5000")
})