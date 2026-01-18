//imports
const express = require('express')
const router = express.Router()

const Player = require('../models/player.js')

//display characters page
router.get('/', async (req, res) => {
    try {
        const currentPlayer = await Player.findById(req.session.player._id)

        res.render('characters/characters.ejs', {
            characters: currentPlayer.characters
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

//display details page
router.get('/:characterId', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)

    res.render('characters/details.ejs', {
        character: character
        //characters plural?
    })
})

//post deletion
router.delete('/:characterId', async (req, res) => {
    try {
        const currentPlayer = await Player.findById(req.session.player._id)
        currentPlayer.characters.id(req.params.characterId).deleteOne()
        await currentPlayer.save()
        res.redirect(`/players/${currentPlayer.id}/characters`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


//display add page
router.get('/add', (req, res) => {
    res.render('characters/add.ejs')
})

//post new character
//should be /new?
router.post('/', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    currentPlayer.characters.push(req.body)
    await currentPlayer.save()
    res.redirect(`/players/${currentPlayer.id}/characters`)
})

//display edit page
router.get('/:characterId/edit', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    res.render('characters/edit.ejs', {
        character: character
    })
})
//post edits
router.put(':characterId', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    character.set(req.body)
    await currentPlayer.save()
    res.redirect(`/players/${currentPlayer.id}/characters/${req.params.characterId}`)
})


//export
module.exports = router