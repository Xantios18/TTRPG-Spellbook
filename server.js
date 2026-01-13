//------------------------------IMPORTS------------------------------
const express = require('express')

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require ('mongoose')

//------------------------------GLOBAL VARIABLES------------------------------
const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

//------------------------------MIDDLEWARE------------------------------



//------------------------------ROUTES------------------------------

//landing page

//sign-in routes

//sign-up controller

//characters controller
    //spells controller will be inside the characters controller




//------------------------------APP LISTENER------------------------------

app.listen (PORT, () => {
    console.log(`listening on port: ${PORT}`)
})


