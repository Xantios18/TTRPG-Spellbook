const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Player = require('../models/player.js')