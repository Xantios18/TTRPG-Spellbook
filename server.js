//------------------------------IMPORTS------------------------------
const express = require('express')

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require ('mongoose')

const session = require('express-session')

const bcrypt = require('bcrypt')

const Player = require('./models/player.js')
const passPlayerToView = require('./middleware/pass-player-to-view.js')

//------------------------------GLOBAL VARIABLES------------------------------
const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

//------------------------------MIDDLEWARE------------------------------

app.use(express.urlencoded({ extended: false }))

//something wrong here
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
}))
//fix to load page

//------------------------------ROUTES------------------------------




//sign-in routes


app.post('/sign-in', async (req, res) => {
    try {
        const playerInDatabase = await Player.findOne({ playerName: req.body.playerName })
        if(!playerInDatabase) {
            return res.send('Login failed, Please try again.')
        }

        const validPassword = bcrypt.compareSync(
            req.body.password,
            playerInDatabase.password
        )
        if(!validPassword) {
            return res.send('Login failed, Please try again.')
        }

        req.session.player = {
            playerName: playerInDatabase.playerName,
            _id: playerInDatabase._id
        }
    
    res.redirect('/')

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }

})

//landing page

app.use(passPlayerToView)

app.get('/', (req, res) => {
    if(req.session.player) {
        res.redirect(`/players/${req.session.player._id}/characters`)
    } else {
        res.render('home.ejs')
    }       
})

//sign up

app.get('sign-up', (req, res) => {
    app.render('sign-up.ejs')
})

app.post('/sign-up', async (req, res) => {
    try {
        const playerInDatabase = await Player.findOne({ playerName: req.body.playerName })
        if(playerInDatabase) {
            return res.send('There is another player with that name already')
        } 

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword

        await Player.create(req.body)

        res.redirect('/')
    } catch (error) {
        console.log(error)
        app.redirect('/')
    }
})

//sign out
app.get('/sign-out', (req, res) => {
    req.session.destroy()
    res.redirect('/')
    //don't forget to build the sign-out button in the nav bar
})


//characters controller
    //spells controller will be inside the characters controller




//------------------------------APP LISTENER------------------------------

app.listen (PORT, () => {
    console.log(`listening on port: ${PORT}`)
})


