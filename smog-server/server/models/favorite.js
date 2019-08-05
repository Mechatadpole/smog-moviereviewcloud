module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING
        },
        UserId: {
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        imdbId: {
            type: DataTypes.STRING
        }
    })

    return Favorite;
}