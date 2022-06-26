'use-strict'
const { error } = require('console')
var artistasModelo = require('../MODELO/artistas')
var artista = new artistasModelo()


function añadirArtista(req, res) {
    var params = req.body
    console.log(params)

    artista.nombre = params.nombre
    artista.descripcion = params.descripcion
    artista.imagen = 'null'

    artista.save((error, artistaBD) => {
        if (error) {
            res.status(500).send({ message: 'Error: No se ha podido guardar el artista' })
        } else {
            if (!artistaBD) {
                res.status(404).send({ message: 'No se han recibido los datos a guardar' })
            } else {
                res.status(201).send({
                    artista: artistaBD,
                    message: 'Artista registrado'
                })
            }
        }
    })
}

module.exports = {
    añadirArtista
}