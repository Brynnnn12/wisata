const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const Place = require('../models/place');
const Review = require('../models/review');
const ReviewController = require('../controller/review')
const isValidObjectId = require('../middleware/isValidObjectId');
const isAuth = require('../middleware/isAuth');
const { isAuthorReview } = require('../middleware/isAuthor');
const { validateReview } = require('../middleware/validator')




const router = express.Router( { mergeParams: true} );



router.post('/', isAuth, isValidObjectId('/places'), validateReview, wrapAsync(ReviewController.store))

router.delete('/:review_id', isAuth, isAuthorReview, isValidObjectId('/places'), wrapAsync(ReviewController.destroy))
module.exports = router;