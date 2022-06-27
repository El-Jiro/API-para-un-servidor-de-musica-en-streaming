'use-strict'
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

function buscarArtista(req, res) {

    var artistaID = req.params.id

    artistasModelo.findById(artistaID, (err, artistaBD) => {

        if (err) {
            res.status(500).send({ message: 'Ha ocurrido un error' })
        } else {
            if (!artistaBD) {
                res.status(404).send({ message: 'No se ha encontrado el artista' })
            } else {
                res.status(200).send({ artista: artistaBD })
            }
        }
    })

}
module.exports = {
    añadirArtista,
    buscarArtista
}