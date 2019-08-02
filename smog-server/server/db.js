const Sequelize = require('sequelize');

const sequelize = new Sequelize('OUR DB NAME', 'YOUR PG USERNAME', 'YOUR PG PASSWORD', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function () {
        console.log('Connected to workoutlog postgres database');
    },
    function (err) {
        console.log(err);
    }
);

module.exports = sequelize;