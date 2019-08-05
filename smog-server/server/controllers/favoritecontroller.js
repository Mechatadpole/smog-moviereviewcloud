const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Favorite = sequelize.import('../models/favorite');

module.exports = router;