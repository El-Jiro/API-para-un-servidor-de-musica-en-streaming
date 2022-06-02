'use-strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema

var esquemaCanciones = schema({
    numero: Number,
    nombre: String,
    duracion: Number,
    file: String,
    album: { type: schema.ObjectId, ref: 'Albumes' }
})

module.exports = mongoose.model('Canciones', esquemaCanciones)