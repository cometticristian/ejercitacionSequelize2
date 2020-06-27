const db = require('../database/models');
const sequelize = db.sequelize;

let moviesController = {
    list: function (req, res, next) {
        db.Movies.findAll()
        .then((peliculas) => {
            res.render('list', { peliculas: peliculas });
        })
    },
    detail: function (req, res, next) {
        db.Movies.findByPk(req.params.id)
            .then((pelicula) => {
                res.render('detail', { pelicula: pelicula })
            })
    }
}

module.exports = moviesController;