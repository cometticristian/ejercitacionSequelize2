var express = require('express');
var moviesController = require('../controllers/moviesController');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');

router.get('/list', moviesController.list);

router.get('/detail/:id', moviesController.detail);

router.get('/create', moviesController.create);

router.post('/create', [
    check('title').isLength({ min: 2, max:60 }).withMessage('El titulo de la pelicula debe tener entre 2 y 60 caracteres'),
    check('rating').isNumeric().withMessage('Debe ingresar un numero'),
    body('rating').custom((number) => {
        return number >= 0 && number <= 10;
    }).withMessage('El numero debe ser entre 0 y 10 inclusive'),
    check('awards').isInt().withMessage('Debe ingresar un numero entero'),
    body('awards').custom((number) => {
        return number >= 0;
    }).withMessage('El numero debe ser mayor o igual a 0'),
    check('length').isInt().withMessage('Debe ingresar un numero entero'),
    body('length').custom((number) => {
        return number >= 0 && number <= 500;
    }).withMessage('El numero debe ser entre 0 y 500 inclusive'),
], moviesController.store);

router.get('/edit/:id', moviesController.edit);

router.put('/edit/:id', [
    check('title').isLength({ min: 2, max:60 }).withMessage('El titulo de la pelicula debe tener entre 2 y 60 caracteres'),
    check('rating').isNumeric().withMessage('Debe ingresar un numero'),
    body('rating').custom((number) => {
        return number >= 0 && number <= 10;
    }).withMessage('El numero debe ser entre 0 y 10 inclusive'),
    check('awards').isInt().withMessage('Debe ingresar un numero entero'),
    body('awards').custom((number) => {
        return number >= 0;
    }).withMessage('El numero debe ser mayor o igual a 0'),
    check('length').isInt().withMessage('Debe ingresar un numero entero'),
    body('length').custom((number) => {
        return number >= 0 && number <= 500;
    }).withMessage('El numero debe ser entre 0 y 500 inclusive'),
], moviesController.update);

router.delete('/delete/:id', moviesController.destroy);

module.exports = router;