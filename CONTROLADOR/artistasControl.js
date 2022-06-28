'use-strict'
var artistasModelo = require('../MODELO/artistas')
var artista = new artistasModelo()
const mongoosePage = require('mongoose-pagination')


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

function buscarArtista(req, res) {

    var artistaID = req.params.id

    artistasModelo.findById(artistaID, (err, artistaBD) => {

        if (err) {
            res.status(500).send({ message: 'Ha ocurrido un error al buscar el artista' })
        } else {
            if (!artistaBD) {
                res.status(404).send({ message: 'No se ha encontrado el artista' })
            } else {
                res.status(200).send({ artista: artistaBD })
            }
        }
    })

}

function buscarArtistas(req, res) {

    if (req.params.page) {
        var page = req.params.page
    } else {
        var page = 1
    }

    var itemPaginas = 10
    artistasModelo.find().sort('nombre').
    paginate(page, itemPaginas, function(err, artistas, total) {
        if (err) {
            res.status(500).send({ message: 'Error del servidor' })
        } else {
            if (!artistas) {
                res.status(404).send({ message: 'No hay datos para mostrar en esta página' })
            } else {
                res.status(200).send({
                    pages: total,
                    artistas: artistas
                })
            }
        }
    })
}

function actualizarArtista(req, res) {

    var artistaID = req.params.id
    var data = req.body

    artistasModelo.findByIdAndUpdate(artistaID, data, (err, artistaActualizado) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la información del artista' })
        } else {
            if (!artistaActualizado) {
                res.status(404).send({ message: 'No se encontró el artista' })
            } else {
                res.status(200).send({
                    artista: artistaActualizado,
                    message: 'Se actualizó correctamente la información del artista'
                })
            }
        }
    })

}

module.exports = {
    añadirArtista,
    buscarArtista,
    buscarArtistas,
    actualizarArtista
}