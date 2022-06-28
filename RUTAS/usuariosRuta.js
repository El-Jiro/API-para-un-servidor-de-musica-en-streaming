'use-strict'

const express = require('express');
const api = express.Router();
var usuarioControl = require('../CONTROLADOR/usuariosControl')
var md_auth = require('../MIDDLEWARE/autenticar')
const multiparty = require('connect-multiparty')
var dir_fotos = multiparty({ uploadDir: './FOTOS/usuario' })


api.get('/probando-controlador', usuarioControl.probar)
api.get('/bienvenido', usuarioControl.darBienvenida)
api.post('/registro', usuarioControl.registrarUsuario)
api.post('/login', usuarioControl.iniciarSesion)
api.put('/actualizar-usuario/:id', md_auth.validarAcceso, usuarioControl.actualizarUsuario)
api.delete('/eliminar-usuario/:id', md_auth.validarAcceso, usuarioControl.eliminarUsuario)
api.post('/actualizar-foto/:id', [md_auth.validarAcceso, dir_fotos], usuarioControl.actualizarFoto)
module.exports = api