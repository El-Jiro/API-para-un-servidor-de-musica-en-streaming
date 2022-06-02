'use-strict'

var express = require('express')
var usuarioControl = require('../CONTROLADOR/usuariosControl')

var api = express.Router();
api.get('/probando-controlador', usuarioControl.prueba)
api.post('/registro', usuarioControl.registrarUsuario)
module.exports = api