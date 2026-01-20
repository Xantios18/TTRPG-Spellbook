const mongoose = require('mongoose')

const spellsSchema = mongoose.Schema({
    name: {type: String, required: true},
    level: {type: Number, required: true},
    school: {type: String, enum: ['abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation'], required: true},
    prepared: Boolean,
    concentraion: Boolean,
    ritual: Boolean,
    castingTime: {type: String, enum: ['reaction', 'bonus-action', 'action', 'one-minute', 'other'], required: true},
    verbalComponent: Boolean,
    somaticComponent: Boolean,
    materialComponent: {type: String},
    monetaryComponent: {type: String},
    duration: {type: String, required: true},
    range: {type: Number, required: true},
    effect: {type: String, required: true},
    notes: {type: String},
})



const characterSchema = mongoose.Schema({
    name: {type: String, required: true},
    class: {type: String, enum: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'], required: true},
    // multiclass:{type: String, enum: ['none', 'bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard']},
    firstLvlSlots: {type: Number},
    secondLvlSlots: {type: Number},
    thirdLvlSlots: {type: Number},
    fourthLvlSlots: {type: Number},
    fifthLvlSlots: {type: Number},
    sixthLvlSlots: {type: Number},
    seventhLvlSlots: {type: Number},
    eighthLvlSlots: {type: Number},
    ninthLvlSlots: {type: Number},
    spells: [spellsSchema]
})



const playerSchema = mongoose.Schema({
    playerName: {
        type: String, required: true,
    },
    password: {
        type: String, required: true,
    },
    characters: [characterSchema]
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player