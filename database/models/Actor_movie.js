module.exports = (sequelize, dataTypes) => {

    let alias = "Actor_movie";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        actor_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        movie_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        tableName: 'actors_movies',
        timestamps: false
    }

    const Actor_movie = sequelize.define(alias, cols, config);

    return Actor_movie;
}