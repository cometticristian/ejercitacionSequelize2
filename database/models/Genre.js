module.exports = (sequelize, dataTypes) => {

    let alias = "Genre";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: true
        },
        ranking: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        active: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        tableName: 'genres',
        timestamps: false
    }

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function (models) {
        Genre.hasMany(models.Movie, {
            as: 'movies',
            foreignKey: 'genre_id'
        })
    }

    return Genre;
}