//imports
const express = require('express')
const router = express.Router()

const Player = require('../models/player.js')

//display spell add page
router.get('/:characterId/addSpell', (req, res) => {
    res.render('characters/spells/add.ejs')
})

//display spell details page
router.get('/:characterId/:spellId', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    const spell = await character.spells.id(req.params.spellId)

    res.render('characters/spells/details.ejs', {
        spell: spell
    })
})

//post spell deletion
router.delete('/:characterId/:spellId', async (req, res) => {
    try {
        const currentPlayer = await Player.findById(req.session.player._id)
        const character = await currentPlayer.characters.id(req.params.characterId)
        character.spells.id(req.params.spellId).deleteOne()
        await currentPlayer.save()
        res.redirect(`/players/${currentPlayer.id}/characters/${req.params.characterId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

//post new spell
router.post('/:characterId', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    character.spells.push(req.body)
    await currentPlayer.save()
    res.redirect(`/players/${currentPlayer.id}/characters/${req.params.characterId}`)
})

//display edit spell page
router.get('/:characterId/:spellId/edit', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    const spell = await character.spells.id(req.params.spellId)
    res.render('characters/spells/edit.ejs', {
        spell: spell
    })
})

//put spell edits
router.put('/:characterId/:spellId', async (req, res) => {
    try {
        const currentPlayer = await Player.findById(req.session.player._id)
        const character = await currentPlayer.characters.id(req.params.characterId)
        const spell = await character.spells.id(req.params.spellId)
        spell.set(req.body)
        await currentPlayer.save()
        res.redirect(`/players/${currentPlayer.id}/characters/${req.params.characterId}/${req.params.spellId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    })