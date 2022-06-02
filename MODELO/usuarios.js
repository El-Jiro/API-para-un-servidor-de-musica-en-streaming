'use strict'

var mongoose = require('mongoose')
var schema = mongoose.Schema

var esquemaUsuarios = schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,
    imagen: String
})

module.exports = mongoose.model('Usuarios', esquemaUsuarios)