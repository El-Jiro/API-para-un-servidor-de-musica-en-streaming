'use strict'
const express = require('express')
const bodyParser = require('body-parser')

var app = express()
var user_routes = require('./RUTAS/usuariosRuta')
var artist_routes = require('./RUTAS/artistasRuta')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', user_routes)
app.use('/api', artist_routes)

/* app.get('/pruebas', function(_req, res) {
    res.status(200).send({ message: "Bienvenido al curso Iván Azamar" })
}) */

module.exports = app