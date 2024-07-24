const mongoose = require('mongoose');
//Define the Mongodb connnection URL
const mongoURL = 'mongodb://localhost:27017/hotels'//can replace hotels with something else

// mongoose.set('strictQuery', false);

mongoose.connect(mongoURL)


const db = mongoose.connection;
db.on('connected', () => {
    console.log("server is connected");
})

db.on('disconnected', () => {
    console.log("server is disconnected");
})
db.on('error', () => {
    console.log("error");
})

//export the database connection
module.exports = db;