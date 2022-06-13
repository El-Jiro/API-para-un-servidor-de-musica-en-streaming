'use-strict'

var express = require('express')
var usuarioControl = require('../CONTROLADOR/usuariosControl')

var api = express.Router();
api.get('/probando-controlador', usuarioControl.probar)
api.get('bienvenido', usuarioControl.darBienvenida)
api.post('/registro', usuarioControl.registrarUsuario)
api.post('/login', usuarioControl.iniciarSesion)
module.exports = api