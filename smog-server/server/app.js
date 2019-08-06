require('dotenv').config();
var express = require('express'); //! brings in the requirement of the express npm package
var app = express(); //! Creates an instance of express.
var test = require('./controllers/testcontroller') //* Can be removed
var sequelize = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

sequelize.sync(); //TODO: When resetting all tables, put {force: true} into the parameters of sync().

const user = require('./controllers/usercontroller');
const review = require('./controllers/reviewcontroller');
const favorite = require('./controllers/favoritecontroller');

app.use('/user', user);
app.use('/review', review);
app.use('/favorite', favorite);

//? Message displayed to console when backend server is up and running connected to the correct port
app.listen(3000, function () {
    //! if app is being hosted on this port, print the line to the console
    console.log('The backend is now listening on port 3000');
});

//! Test Route
app.use('/test', test); //* Can be removed
//?       ENDPOINT   (request, response)
app.use('/api/test', function (req, res) { //* Can be removed
    //? Response Call Back Function sends this string of text into the response of the postman JSON
    res.send('This is a test from the /api/test endpoint. Backend connected');
});

