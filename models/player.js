const mongoose = require('mongoose')

const spellsSchema = mongoose.Schema({
    name: {type: string, required:true},
    level: {type: number, required:true},
    prepared: {type: Boolean},
    concentraion: {type: Boolean, required:true},
    ritual: {type: Boolean, required:true},
    castingTime: {type: string, enum: ['reaction', 'bonus action', 'action', '1 minute', 'other'], required:true},
    verbalComponent: {type: Boolean, required:true},
    somaticComponent: {type: Boolean, required:true},
    materialComponent: {type: Boolean, required:true},
    monetaryComponent: {type: string},
    duration: {type: string, required:true},
    range: {type: Number, required:true},
    effect: {type: string, required:true},
    notes: {type: string},
})



const characterSchema = mongoose.Schema({
    name: {type: string, required: true},
    class: {type: string, enum: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'], required: true},
    multiclass:{type: string, enum: ['none', 'bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard']},
    firstLvlSlots: {type: number},
    secondLvlSlots: {type: number},
    thirdvlSlots: {type: number},
    fourthLvlSlots: {type: number},
    fifthLvlSlots: {type: number},
    sixthLvlSlots: {type: number},
    seventhLvlSlots: {type: number},
    eighthLvlSlots: {type: number},
    ninthLvlSlots: {type: number},
    spells: [spellsSchema]
})



const playerSchema = mongoose.Schema({
    username: {
        type: string, required: true,
    },
    password: {
        type: string, required: true,
    },
    characters: [characterSchema]
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player