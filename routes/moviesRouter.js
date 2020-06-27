var express = require('express');
var moviesController = require('../controllers/moviesController');
var router = express.Router();

router.get('/list', moviesController.list);

router.get('/detail/:id', moviesController.detail);

module.exports = router;