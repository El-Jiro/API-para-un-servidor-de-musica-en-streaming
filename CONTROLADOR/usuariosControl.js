'use-strict'
const bcrypt = require('bcrypt')
const defaultRequest = require('rest/interceptor/defaultRequest')
var usuariosModelo = require('../MODELO/usuarios')
var usuario = new usuariosModelo()

function prueba(req, res) {
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios de la api REST con node y mongo'
    })
}


function registrarUsuario(req, res) {

    var params = req.body
    console.log(params)

    usuario.nombre = params.nombre
    usuario.apellido = params.apellido
    usuario.email = params.email
    usuario.rol = 'ROLE-USER'
    usuario.imagen = 'null'
    usuario.password = params.password

    if (params.password) {

        //encriptar contraseña y guardar datos
        bcrypt.hash(params.password, 10, function(err, hash) {

            usuario.password = hash

            if (usuario.nombre != null && usuario.apellido != null && usuario.email != null) {
                //Guardar el usuario en la BD
                usuario.save((err, usuarioAlmacenado) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' })

                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ message: 'No se han encontrado los datos del usuario a guardar' })
                        } else {
                            res.status(201).send({ usuario: usuarioAlmacenado })
                        }
                    }
                })
            } else {
                res.status(400).send({ message: 'Debes rellenar todos los campos' })
            }
        })
    } else {
        res.status(400).send({ message: 'Introduce la contraseña' })
    }

}

function iniciarSesion(req, res) {

    var params = req.body
    var email = params.email
    var password = params.password

    usuariosModelo.findOne({ email: email }, (err, user) => {
        if (err) {
            res.send(500).send({ message: "No se ha podido guardar el usuario" })
        } else {

        }
    })
}

module.exports = {
    prueba,
    registrarUsuario
}