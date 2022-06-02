'use-strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema

var esquemaArtistas = schema({
    nombre: String,
    descripcion: String,
    imagen: String
})

module.exports = mongoose.model('Artistas', esquemaArtistas)