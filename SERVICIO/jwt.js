'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
var claveSecreta = 'secret_key'

function createToken(user) {
    const payload = {
        sub: user._id,
        name: user.nombre,
        last_name: user.apellido,
        email: user.email,
        iat: moment.unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, claveSecreta)
}

module.exports = {
    createToken
}