'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');
const { TOKEN_SECRET } = require('../config/config').config;

const validaToken = (req, res, next) => {
    if (!req.headers.authorization) {
        console.error('Valida Token, ERROR: No tiene Authorization');
        return res.status(401).json({ code: 401, msg: 'No tienes permiso para esta ruta' });
    }
    if (!req.headers.codigosession) {
        console.error('Petición erronea falta el codigosession');
        return res.status(400).json({ code: 400, msg: 'Petición erronea' });
    }
    try {
        const payload = jwt.decode(req.headers.authorization, TOKEN_SECRET);
        if (moment.unix(payload.iat).add(3, 'm') <= moment()) {
            console.error('Token expirado');
            return res.status(401).json({ code: 401, msg: 'Token expirado' });
        }
    } catch (error) {
        console.error('Error en validar el token: ', error);
        return res.status(401).json({ code: 401, msg: 'Token expirado' });
    }
    console.log('Token valido');
    next();
};

module.exports = { validaToken };