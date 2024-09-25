const express = require('express');
const Place = require('../models/place');
const PlaceController = require('../controller/places');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const {isAuthorPlace} = require('../middleware/isAuthor');
const isValidObjectId = require('../middleware/isValidObjectId');
const isAuth = require('../middleware/isAuth');
const { validatePlace } = require('../middleware/validator');
const upload = require('../config/multer')

const router = express.Router();

router.get('/', wrapAsync(PlaceController.index));

router.get('/create', isAuth, (req, res) => {
    res.render('places/create');
});


router.post('/', isAuth, upload.array('image'), validatePlace, wrapAsync(PlaceController.store));

router.get('/:id', isValidObjectId('/places'), wrapAsync(PlaceController.show));

router.get('/:id/edit', isAuth, isAuthorPlace,  isValidObjectId('/places'), wrapAsync(PlaceController.edit));

router.put('/:id', isAuth, isAuthorPlace,  isValidObjectId('/places'), upload.array('image'), validatePlace, wrapAsync(PlaceController.update));

router.delete('/:id', isAuth, isAuthorPlace,  isValidObjectId('/places'), wrapAsync(PlaceController.destroy));

router.delete('/:id/images',isAuth, isAuthorPlace, isValidObjectId('/places'), wrapAsync(PlaceController.destroyImages))

module.exports = router;
