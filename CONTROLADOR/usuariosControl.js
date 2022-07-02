'use-strict'

const bcrypt = require('bcrypt')
var usuariosModelo = require('../MODELO/usuarios')
var usuario = new usuariosModelo()
const jwt = require('../SERVICIO/jwt')
const path = require('path')
const fs = require('fs')



function probar(req, res) {
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios de la api REST con node y mongo'
    })
}

function darBienvenida(req, res) {
    res.status(200).send({
        message: 'Bienvenido al curso Iván Azamar'
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
            res.status(500).send({ message: "Error interno del servidor" })
        } else {
            if (!user) {
                res.status(404).send({ message: "El usuario no existe" })
            } else {
                bcrypt.compare(password, user.password, function(err, check) {
                    if (check) {
                        console.log("Se ha iniciado sesión con éxito")
                        if (params.gethash) {
                            res.status(201).send({ token: jwt.createToken(user) })
                        } else {
                            res.status(200).send({ user: user })
                        }
                    } else {
                        res.status(401).send({ message: "Contraseña incorrecta" })
                    }
                })
            }
        }
    })
}

function actualizarUsuario(req, res) {

    var user_id = req.params.id
    var update = req.body

    usuariosModelo.findByIdAndUpdate(user_id, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' })
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se encontró el usuario' })
            } else {
                res.status(200).send({ user: userUpdate })
                console.log('Usuario actualizado con éxito')
            }
        }
    })
}

function eliminarUsuario(req, res) {

    var user_id = req.params.id

    usuariosModelo.findByIdAndRemove(user_id, (err, usuarioBorrado) => {
        if (err) {
            res.status(500).send({ message: 'No se ha podido eliminar el usuario' })
        } else {
            if (!usuarioBorrado) {
                res.status(404).send({ message: 'El usuario no existe' })
            } else {
                res.status(200).send({
                    message: 'Se ha eliminado el usuario con éxito',
                    usuario: usuarioBorrado
                })
            }
        }

    })
}

function actualizarFoto(req, res) {
    var user_id = req.params.id

    if (req.files) {
        var file_path = req.files.image.path
        var file_array = file_path.split('\\')
        var file_name = file.split[2]
        var extension = file_array[2].split('\.')

        if (extension[1] == 'png' || extension[1] == 'gif' || extension[1] == 'jpg') {

            usuariosModelo.findByIdAndUpdate(user_id, { image: file_array[2] }, (err, userUpdate) => {
                if (err) {
                    res.status(500).send({ message: 'No se ha podido actualizar el usuario' })
                } else {
                    if (!userUpdate) {
                        res.status(404).send({ message: 'El usuario no existe' })
                    } else {
                        res.status(200).send({
                            image: file_name,
                            usuario: userUpdate
                        })
                    }
                }
            })
        } else {
            res.status(400).send({ message: 'Formato de archivo no válido' })
        }
    } else {
        res.status(500).send({ message: 'Error al cargar el archivo' })
    }
}


module.exports = {
    probar,
    darBienvenida,
    registrarUsuario,
    iniciarSesion,
    actualizarUsuario,
    eliminarUsuario,
    actualizarFoto
}