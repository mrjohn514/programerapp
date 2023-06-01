if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import the Express.js framework
const express = require('express')

// Import the "cookie-parser" middleware module,
// which is used for parsing cookies from HTTP requests and responses
const cookieParser = require('cookie-parser')

// Import the "mongoose" module, which is an Object Data Modeling (ODM) library for MongoDB,
//and establish a connection to the database using the configuration settings in "./config/mongoose.js".
const db = require('./config/mongoose')

// Import the "express-session" middleware module,
// which is used for managing user sessions in Express.js applications
const session = require('express-session')

// Import the "passport" middleware module,
//which is an authentication middleware for Node.js applications
const passport = require('passport')

// Import the Passport Local authentication strategy defined in "./config/passport-local-strategy.js"
const passportlocal = require('./config/passport-local-strategy')

// Import the "connect-mongo" middleware module, which is used for storing user sessions in MongoDB
const MongoStore = require('connect-mongo')

// Create a new Express application instance
const app = express()

// Use the "cookie-parser" middleware for parsing cookies
app.use(cookieParser())

// Set the view engine to EJS
app.set('view engine', 'ejs')

// Set the directory for views to "./views"
app.set('views', './views')

//setting the middleware that will takes in the session cookies and encrypt it

app.use(
  session({
    name: process.env.SNAME, ///name of cookie
    secret: process.env.SECRET, //whenever encryption happen ther is key to encode and decode
    saveUninitialized: false, //whenever thre is req which is not initialised ->means when teh user is not loged in identity is not establish
    //so i dont want to store extra data so set to false

    resave: false, //when the identity is established or some sort of session data/user info is present then do i want to save that data again ->no so false
    cookie: {
      maxAge: 1000 * 60 * 100, //for how much millisec cookie live
    },
    store: MongoStore.create({ mongoUrl: process.env.DBURL }), //adding store property as mongostore
  })
)

app.use(passport.initialize())

app.use(passport.session())

app.use(passport.setAuthenticatedUser)

app.use('/', require('./routes'))

app.use(express.static('assets'))

const port = process.env.PORT || 8000

connectDB().then(() => {
  app.listen(port, () => {
    console.log('listening for requests')
  })
})
