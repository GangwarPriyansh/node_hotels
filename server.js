const express = require('express')
const app = express();
// const mongoose = require('mongoose');
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json())

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// const MenuItem = require('./models/menu');


app.get('/', (req, res) => {
  console.log("server is running");
  res.send("welcome to the hotel");
})


//import the router file
const personRoutes = require('./routes/personRoutes')
const manuItemsRoutes = require('./routes/menuItemRoutes')

//use the router
app.use('/person', personRoutes)
app.use('/menu', manuItemsRoutes)   

app.listen(3000, () => {
  console.log("listening on port 3000");
});