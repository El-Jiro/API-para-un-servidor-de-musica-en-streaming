'use-strict'

const express = require('express')
var artistasControl = require('../CONTROLADOR/artistasControl')
const api = express.Router()

api.post('/agregar-artista', artistasControl.añadirArtista)
module.exports = api