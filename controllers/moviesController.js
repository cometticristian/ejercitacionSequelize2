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
            include: [{ association: 'genre' }, { association: 'actors' }]
        })
            .then((pelicula) => {
                res.render('detail', { pelicula: pelicula })
            })
            .catch((error) => {
                console.log(error);
            })
    },
    create: function (req, res, next) {
        db.Genre.findAll()
            .then((genres) => {
                res.render('create', { genres });
            })
            .catch((error) => {
                console.log(error);
            })
    },
    store: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                length: req.body.length,
                genre_id: req.body.genre
            })
                .then(() => {
                    res.redirect('list');
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            db.Genre.findAll()
                .then((genres) => {
                    res.render('create', { errors: errors.errors, datos: req.body, genres });
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    edit: function (req, res, next) {
        let pelicula = db.Movie.findByPk(req.params.id, {
            include: [{ association: 'genre' }]
        });
        let genres = db.Genre.findAll();

        Promise.all([pelicula, genres])
            .then(([pelicula, genres]) => {
                res.render('edit', { pelicula: pelicula, id: req.params.id, genres: genres })
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
                length: req.body.length,
                genre_id: req.body.genre
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
            let pelicula = db.Movie.findByPk(req.params.id, {
                include: [{ association: 'genre' }]
            });
            let genres = db.Genre.findAll();

            Promise.all([pelicula, genres])
                .then(([pelicula, genres]) => {
                    res.render('edit', { datos: req.body, errors: errors.errors, pelicula: pelicula, id: req.params.id, genres: genres })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    destroy: function (req, res, next) {

        let favourite = db.Actor.update({
            favorite_movie_id: 'null'
        }, {
            where: {
                favorite_movie_id: req.params.id
            }
        });

        let relation = db.Actor_movie.destroy({
            where: {
                movie_id: req.params.id
            }
        })

        let movie = db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })

        Promise.all([favourite, relation, movie])
            .then(() => {
                res.redirect('/movies/list');
            })
            .catch((error) => {
                console.log(error);
            })
    },
    genreDetail: function (req, res, next) {
        db.Genre.findByPk(req.params.id, {
            include: [{ association: 'movies' }]
        })
            .then((genre) => {
                res.render('genreDetail', { genre });
            })
            .catch((error) => {
                console.log(error);
            })
    },
    actorDetail: function (req, res, next) {
        db.Actor.findByPk(req.params.id, {
            include: [{ association: 'movies' }]
        })
            .then((actor) => {
                res.render('actorDetail', { actor });
            })
            .catch((error) => {
                console.log(error);
            })
    },
    acting: function (req, res, next) {
        let actors = db.Actor.findAll();
        let movies = db.Movie.findAll();

        Promise.all([actors, movies])
        .then(([actors, movies]) => {
            res.render('acting', {actors, movies});
        })
        .catch((error) => {
            console.log(error);
        })
    },
    createActing: function (req, res, next) {
        db.Actor_movie.create({
            actor_id: req.body.actor,
            movie_id: req.body.movie
        })
        .then(() => {
            res.redirect('/movies/list')
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

module.exports = moviesController;