'use strict';
const helmet = require('helmet');
const { login } = require('./login/login.controller');
const { allUsers, userId } = require('./users/users.controller');

/*************************MIDDLEWARE****************************/
const { validaToken } = require('../middleware/validateToken');
/*************************MIDDLEWARE****************************/
const url = '/api/v1';
module.exports = (app) => {
    app.use(helmet({
        frameguard: {
            action: 'deny'
        }
    }));
    app.post(`${url}/login`, login);
    app.use(validaToken);
    app.get(`${url}/users`, allUsers);
    app.get(`${url}/users/:id`, userId);
};