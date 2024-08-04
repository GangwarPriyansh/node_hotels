const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { Passport } = require('passport');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: false
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },

    address: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this
    //hash the password only as if it has been modified (or is new)
    if (!person.isModified('password')) return next()
    try {
        //hash password genneration
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(person.password, salt)
        //override the plain password with hash password
        person.password = hashedPassword
        next()
    }
    catch (err) {
        return next(err)
    }
})
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //use bcrypt to compare the provide password with hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (err) {
        throw err
    }
}
//create person model
const Person = mongoose.model('Person', personSchema)
module.exports = Person