require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


const app = express();

app.use(express.json());
app.use(express.static('views'));
app.use(express.urlencoded({
    extended:true
}));

app.set("view engine","ejs");

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zto5axo.mongodb.net/test`),{
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecrctekey",
  saveUninitialized:false,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});


app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});


var route = require('./routes/route');
app.use('/', route);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on Port '+PORT);
});