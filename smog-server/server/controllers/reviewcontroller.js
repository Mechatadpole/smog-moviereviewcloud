const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Review = sequelize.import('../models/review');


module.exports = router;