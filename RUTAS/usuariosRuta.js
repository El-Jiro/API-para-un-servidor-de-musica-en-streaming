'use-strict'

var express = require('express');
var usuarioControl = require('../CONTROLADOR/usuariosControl')
var md_auth = require('../MIDDLEWARE/autenticar')
var api = express.Router();


api.get('/probando-controlador', usuarioControl.probar)
api.get('/bienvenido', usuarioControl.darBienvenida)
api.post('/registro', usuarioControl.registrarUsuario)
api.post('/login', usuarioControl.iniciarSesion)
api.put('/actualizar-usuario/:id', md_auth.validarAcceso, usuarioControl.actualizarUsuario)
api.delete('/eliminar-usuario/:id', md_auth.validarAcceso, usuarioControl.eliminarUsuario)
api.post('/actualizar-foto/:id', md_auth.validarAcceso, usuarioControl.actualizarFoto)
module.exports = api