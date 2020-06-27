module.exports = (sequelize, dataTypes) => {

    let alias = "Movie";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: dataTypes.DECIMAL,
            allowNull: true
        },
        awards: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        length: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        genre_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: false
    }

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = function (models) {
        Movie.belongsTo(models.Genre, {
            as: 'genero',
            foreignKey: 'genre_id'
        })
        Movie.belongsToMany(models.Actor, {
            as: 'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }

    return Movie;
}