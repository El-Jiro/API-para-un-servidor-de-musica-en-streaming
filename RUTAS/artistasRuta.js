'use-strict'

const express = require('express')
const api = express.Router()
var artistasControl = require('../CONTROLADOR/artistasControl')

api.post('/agregar-artista', artistasControl.añadirArtista)
api.get('/buscar-artista/:id', artistasControl.buscarArtista)
api.get('/buscar-artistas:/page?', artistasControl.buscarArtistas)
api.put('/actualizar-artista/:id', artistasControl.actualizarArtista)
api.delete('/eliminar-artista/:id', artistasControl.eliminarArtista)

module.exports = api