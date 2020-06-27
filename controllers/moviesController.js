const db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;

let moviesController = {
    list: function (req, res, next) {
        db.Movies.findAll()
            .then((peliculas) => {
                res.render('list', { peliculas: peliculas });
            })
            .catch((error) => {
                console.log(error);
            })
    },
    detail: function (req, res, next) {
        db.Movies.findByPk(req.params.id)
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
            db.Movies.create(req.body)
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
        db.Movies.findByPk(req.params.id)
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
            db.Movies.update({
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
        db.Movies.destroy({
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