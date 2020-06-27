const db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

let moviesController = {
    list: function (req, res, next) {
        db.Movie.findAll()
            .then((peliculas) => {
                res.render('list', { peliculas: peliculas });
            })
            .catch((error) => {
                console.log(error);
            })
    },
    detail: function (req, res, next) {
        db.Movie.findByPk(req.params.id, {
            include: [{association: 'genre'}, {association: 'actors'}]
        })
            .then((pelicula) => {
                res.render('detail', { pelicula: pelicula })
            })
            .catch((error) => {
                console.log(error);
            })
    },
    create: function (req, res, next) {
        res.render('create');
    },
    store: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Movie.create(req.body)
                .then(() => {
                    res.redirect('list');
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            res.render('create', { errors: errors.errors, datos: req.body })
        }
    },
    edit: function (req, res, next) {
        db.Movie.findByPk(req.params.id)
            .then((pelicula) => {
                res.render('edit', { pelicula: pelicula, id: req.params.id })
            })
            .catch((error) => {
                console.log(error);
            })
    },
    update: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Movie.update({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                length: req.body.length
            }, {
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    res.redirect('/movies/list')
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            res.render('edit', { errors: errors.errors, datos: req.body, id: req.params.id })
        }
    },
    destroy: function (req, res, next) {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies/list');
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

module.exports = moviesController;