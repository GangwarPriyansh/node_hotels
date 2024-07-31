const express = require('express')
const app = express()
const db = require('./db')
const passport = require('./auth') 
const Person  = require('./models/Person')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(passport.initialize());

//Middleware Funtion
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()}Request made to:${req.originalUrl}`);
  next();
}
app.use(logRequest)


const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/login',localAuthMiddleware, (req, res) => {
  console.log("Authentication successfull");
  res.send("welcome to the hotel");
})


//import the router file
const personRoutes = require('./routes/personRoutes')
const manuItemsRoutes = require('./routes/menuItemRoutes')

//use the router
app.use('/person',localAuthMiddleware, personRoutes)
app.use('/menu', manuItemsRoutes)

app.listen(3000, () => {
  console.log("listening on port 3000");
});