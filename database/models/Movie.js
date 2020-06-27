module.exports = (sequelize, dataTypes) => {

    let alias = "Movies";
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
            allowNull: true
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: false
    }

    const Movie = sequelize.define(alias, cols, config);

    return Movie;
}