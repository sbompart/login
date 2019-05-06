'use strict';
const { find, pick } = require('lodash'),
{ config } = require('../../config/config'),
jwt = require('jwt-simple'),
moment = require('moment');
const users = [
    {
        id: 1,
        name: 'Saul',
        lastName: 'Bompart',
        age: 31,
        password: 'abc123',
        userName: 'sbom'
    },
    {
        id: 2,
        name: 'Paula',
        lastName: 'Campos',
        age: 29,
        password: '123abc',
        userName: 'pcam'
    }
];

const generateToken = (userName, session) => {
    const payload = {
        userName: userName,
        iat: moment().unix(),
        session: session
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
    
}

const login = (req, res) => {
    const exists = find(users, {userName: req.body.userName});
    if(exists && exists.password === req.body.password){
        const data = {
            token: generateToken(req.body.userName, req.headers.session)
        };
        res.status(200).json({ data: data });
    }else{
        res.status(400).json({ msj: 'No existe el nombre de usuario o la clave es invalida' });
    }

    
};

module.exports = {
    login: login
};