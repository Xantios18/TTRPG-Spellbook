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

//display add character page
router.get('/add', (req, res) => {
    res.render('characters/add.ejs')
})

//display character details page
router.get('/:characterId', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)

    res.render('characters/details.ejs', {
        character: character
    })
})

//post character deletion
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




//post new character
router.post('/', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    currentPlayer.characters.push(req.body)
    await currentPlayer.save()
    res.redirect(`/players/${currentPlayer.id}/characters`)
})

//display edit character page
router.get('/:characterId/edit', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    res.render('characters/edit.ejs', {
        character: character
    })
})
//put character edits
router.put('/:characterId', async (req, res) => {
    try {
        const currentPlayer = await Player.findById(req.session.player._id)
        const character = await currentPlayer.characters.id(req.params.characterId)
        character.set(req.body)
        await currentPlayer.save()
        res.redirect(`/players/${currentPlayer.id}/characters/${req.params.characterId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    })

//display spell add page
router.get('/:characterId/addSpell', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    res.render('characters/spells/add.ejs', {
        character: character
    })
})

//display spell details page
router.get('/:characterId/:spellId', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    const spell = await character.spells.id(req.params.spellId)

    res.render('characters/spells/details.ejs', {
        character: character,
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
router.post('/:characterId/spells', async (req, res) => {
    const currentPlayer = await Player.findById(req.session.player._id)
    const character = await currentPlayer.characters.id(req.params.characterId)
    if(req.body.prepared === 'on') {
        req.body.prepared = true
    } else {
        req.body.prepared = false
    }
    if(req.body.concentraion === 'on') {
        req.body.concentration = true
    } else {
        req.body.concentration = false
    }
    if(req.body.ritual === 'on') {
        req.body.ritual = true
    } else {
        req.body.ritual = false
    }
    if(req.body.verbalComponent === 'on') {
        req.body.verbalComponent = true
    } else {
        req.body.verbalComponent = false
    }
    if(req.body.somaticComponent === 'on') {
        req.body.somaticComponent = true
    } else {
        req.body.somaticComponent = false
    }
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
        character: character,
        spell: spell
    })
})

//put spell edits
router.put('/:characterId/:spellId', async (req, res) => {
    try {
        const currentPlayer = await Player.findById(req.session.player._id)
        const character = await currentPlayer.characters.id(req.params.characterId)
        const spell = await character.spells.id(req.params.spellId)
        if(req.body.prepared === 'on') {
        req.body.prepared = true
    } else {
        req.body.prepared = false
    }
    if(req.body.concentraion === 'on') {
        req.body.concentration = true
    } else {
        req.body.concentration = false
    }
    if(req.body.ritual === 'on') {
        req.body.ritual = true
    } else {
        req.body.ritual = false
    }
    if(req.body.verbalComponent === 'on') {
        req.body.verbalComponent = true
    } else {
        req.body.verbalComponent = false
    }
    if(req.body.somaticComponent === 'on') {
        req.body.somaticComponent = true
    } else {
        req.body.somaticComponent = false
    }
        spell.set(req.body)
        await currentPlayer.save()
        res.redirect(`/players/${currentPlayer.id}/characters/${req.params.characterId}/${req.params.spellId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    })

//export
module.exports = router