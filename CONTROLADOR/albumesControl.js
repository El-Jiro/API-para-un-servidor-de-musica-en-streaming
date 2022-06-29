'use-strict'

const { default: mongoose } = require('mongoose')
const schema = mongoose.Schema
var albumModelo = require('../MODELO/albumes')
var album = new albumModelo()
const artistaModelo = require('../MODELO/artistas')



function añadirAlbum(req, res) {
    var params = req.body
    console.log(params)

    titulo = params.titulo
    descripcion = params.descripcion
    año = params.año
    imagen = 'null'
    artista = params.artista


    if (!params) {
        res.status(400).send({ message: 'No hay datos en la petición' })
    } else {
        if (!titulo || !descripcion || !año || !artista) {
            res.status(400).send({ message: 'Debe rellenar todos los campos' })
        } else if (typeof(artista != { type: schema.ObjectId, ref: "Artistas" })) {
            res.status(404).send({ message: 'No hay ningún artista con esa id' })
        } else {
            album.save((err, albumBD) => {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar el álbum' })
                } else {
                    if (!albumBD) {
                        res.status(404).send({ message: "No se han recibido los datos a guardar" })
                    } else {
                        res.status(201).send({
                            album: albumBD,
                            message: 'Álbum guardado'
                        })
                    }
                }
            })

        }
    }

}


module.exports = {
    añadirAlbum

}