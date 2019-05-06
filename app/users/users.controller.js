'use strict';
const { forEach, pick, find } = require('lodash'),
    { pullApart } = require('../utils/pullApart');
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

const allUsers = (req, res) => {
    let data = [];
    if (req.query.filters) {
        const filters = pullApart(req.query.filters);
        forEach(users, (user) => {
            data.push(pick(user, filters));
        });
    } else
        data = users;
    res.status(200).json({ data: data });
};

const userId = (req, res) => {
    let exists = find(users, { id: parseInt(req.params.id) });
    if (!exists)
        res.status(409).json({ msg: 'No existe el usuario' });
    else {
        if (req.query.filters) {
            const filters = pullApart(req.query.filters);
            exists = pick(exists, filters);
        }
        res.status(200).json({ data: exists });
    }
};
module.exports = {
    allUsers,
    userId
};