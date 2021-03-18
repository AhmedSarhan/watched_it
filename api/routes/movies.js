const config = require('../config');
const movieCtrl = require('../controllers/movieCtrl');

const { Router } = require('express');

const router = Router();

router.get('/watch_list', movieCtrl.getWatchList);
router.post('/watch_list/:id', movieCtrl.postWatchList);
router.post('/watch_list/delete/:id', movieCtrl.deleteFromWatchList);

router.get('/favorites', movieCtrl.getFavorites);
router.post('/favorites/:id', movieCtrl.postFavorites);
router.post('/favorites/delete/:id', movieCtrl.deleteFromFavorites);

module.exports = router;
