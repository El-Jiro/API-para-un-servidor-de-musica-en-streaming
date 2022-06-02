'use-strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema

var esquemaAlbum = schema({
    titulo: String,
    descripcion: String,
    year: Number,
    imagen: String,
    artista: { type: schema.ObjectId, ref: "Artistas" }
})

module.exports = mongoose.model('Albumes', esquemaAlbum)