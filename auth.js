const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Person = require('./models/Person')

passport.use(new localStrategy(async (USERNAME, password, done) => {
    //authentication logic here
    try {
        const user = await Person.findOne({ username: USERNAME })
        if (!user)
            return done(null, false, { message: 'invalid usename.' })
        const isPasswordMatch = await user.comparePassword(password)
        // const isPasswordMatch = user.password === password ? true : false
        if (isPasswordMatch) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: 'incorrect password.' })
        }

    }
    catch (err) {
        return done(err)
    }
}))

module.exports = passport