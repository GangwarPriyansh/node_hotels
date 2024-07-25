const mongoose = require('mongoose');
require('dotenv').config();
//Define the Mongodb connnection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL(local host)
const mongoURL = process.env.MONGODB_URL

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