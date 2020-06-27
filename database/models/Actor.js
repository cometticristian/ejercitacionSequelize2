module.exports = (sequelize, dataTypes) => {

    let alias = "Actors";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: true
        }
    };
    let config = {
        tableName: 'actors',
        timestamps: false
    }

    const Actor = sequelize.define(alias, cols, config);

    return Actor;
}