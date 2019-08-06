const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.SERVERNAME, 'postgres', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function () {
        console.log('Connected to smog-server postgres database');
    },
    function (err) {
        console.log(err);
    }
);

const User = sequelize.import('./models/user');
const Review = sequelize.import('./models/review');
const Favorite = sequelize.import('./models/favorite');

Review.belongsTo(User, {onDelete: 'CASCADE'});
Favorite.belongsTo(User, {onDelete: 'CASCADE'});

module.exports = sequelize;