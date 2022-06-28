'use-strict'

const express = require('express')
const api = express.Router()
var artistasControl = require('../CONTROLADOR/artistasControl')

api.post('/agregar-artista', artistasControl.añadirArtista)
api.get('/buscar-artista/:id', artistasControl.buscarArtista)
api.get('/buscar-artistas:/page?', artistasControl.buscarArtistas)

module.exports = api