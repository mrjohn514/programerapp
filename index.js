


if(process.env.NODE_ENV!=="production"){
require('dotenv').config();

}

console.log("secret is",process.env.SECRET);
console.log("mongourls is",process.env.DBURL);
const express = require('express');

//for reading and writing into cookies we are using library called cookie parser
//step 1 : npm install cookie-parser
//step 2: require the cookie-pareser library 


const cookieParser=require('cookie-parser');

const db= require('./config/mongoose')

//adding library express session for encrypting cookies
const session =require('express-session');
const passport = require('passport');
const passportlocal=require('./config/passport-local-strategy');

//requiring connectmongo libraray to store sessions in mongodb 
const MongoStore= require('connect-mongo');

const app = express();

//we have to tell the app to use cookie parsr and we know the place to change the  upcoming data through req
//can be alterd in middleware so 
app.use(cookieParser());



// Setting view engine as ejs
app.set('view engine', 'ejs');
// Setting path for views
app.set('views', './views');




//setting the middleware that will takes in the session cookies and encrypt it

app.use(session({
  name:process.env.SNAME,  ///name of cookie
 secret: process.env.SECRET,            //whenever encryption happen ther is key to encode and decode    
saveUninitialized:false,  //whenever thre is req which is not initialised ->means when teh user is not loged in identity is not establish
//so i dont want to store extra data so set to false

resave:false,  //when the identity is established or some sort of session data/user info is present then do i want to save that data again ->no so false
cookie:{
    maxAge:(1000*60*100)      //for how much millisec cookie live
},
store: MongoStore.create({ mongoUrl: process.env.DBURL })   //adding store property as mongostore

}))

//telling app to use passport
app.use(passport.initialize());
app.use(passport.session());

//whenever this function is called it will check wheather a sesssion cookie is present or not
//if present then it will set the 
// user will be set in locals ;

//so whenever app is intialised this is also called (automatically called as midllware)
//so whenver any req is called in then this is called andd  
app.use(passport.setAuthenticatedUser);


//also have to put routes after these
// Redirect all to index.js inside routes directory
app.use('/', require('./routes'));
 



// to use static files, present in assets directory
app.use(express.static('assets'));

// at heroku use defalut  port used is 80 and already env variable is set in heroku machine 
//like PORT=80  and so we have to write process.env.PORT

//const ans= a||b;
//how it works  ans will assign a if a exists 
// if a doesnto exists then a will asign b 

const port = process.env.PORT|| 8000; 


app.listen(port, function(err){
    if(err){
        console.log("Error Occurred while trying to run server on port : ", port);
        return;
    }
    console.log("Express Server is up and Running on port : ", port);
});

