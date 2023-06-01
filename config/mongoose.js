const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DBURL)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB

//require library
// const mongoose = require('mongoose')

// //connext to the database //when u write this line codeial_env name  database is created in mongodb
// mongoose.connect(process.env.DBURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// //acquire the connection to check it is succesful or not
// const db = mongoose.connection

// //if there is error handle error
// db.on('error', console.error.bind(console, 'connextion error'))

// //if succes then hurray running
// db.once('open', function () {
//   console.log('the db is connected')
// })
