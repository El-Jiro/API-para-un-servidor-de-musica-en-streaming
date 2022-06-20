'use-strict'

const jwt = require('jwt-simple')
const momento = require('moment')
var claveSecreta = 'secret_key'

function validarAcceso(req, res, next) {
    if (!req.headers.authorization) {
        res.status(400).send({ message: 'La petición del usuario no contiene datos de autorización' })
    }

    //replace elimina las comillas dobles y simples de la petición, el modificador g es para afectar toda la cadena
    var token = req.headers.authorization.replace(/[""]+/g, '')

    try {

        var payload = jwt.decode(token, claveSecreta)
        if (payload.exp <= momento().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' })
        }

    } catch (error) {
        return res.status(404).send({ message: 'token no válido' })
    }

    req.user = payload
    next()
}

module.exports = {
    validarAcceso
}