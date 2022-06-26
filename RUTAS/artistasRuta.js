'use-strict'

const express = require('express')
var artistasControl = require('../CONTROLADOR/artistasControl')
const api = express.Router()

api.post('/añadir-artista', artistasControl.añadirArtista)