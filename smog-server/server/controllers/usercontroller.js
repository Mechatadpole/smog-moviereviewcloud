const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');

router.post('/create', (req, res) => {
    User.create({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10),
        profilePic: req.body.user.profilePic
    }).then (function createSuccess (user) {
        let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.json({
            user: user,
            message: 'New User Created',
            sessionToken: token
        })
    })
})

router.post('/login', (req, res) => {
    User.findOne({where: {username: req.body.user.username}})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: 'Logged In',
                        sessionToken: token
                    })
                }else {
                    res.status(502).send({error: 'Username or Password is Incorrect'})
                }
            })
        }else {
            res.status(500).send({error: 'Username or Password is Incorrect'})
        }
    },
    err => res.status(501).send({error: 'failed to process'})
    )
})

router.delete('/delete/:id', validateSession, function (req, res) {
    var owner = req.params.id; // Id of user (Authorization token)
    User.destroy({
        where: { id: owner }
    }).then(
        function deleteUserSuccess(owner) {
            res.send('You have deleted yourself');
        },
        function deleteUserError(err) {
            res.send(500, err.message);
        }
    );
});




module.exports = router;