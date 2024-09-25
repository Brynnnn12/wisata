const Place = require('../models/place');
const Review = require('../models/review');

module.exports.store = async(req, res) => {
    const {place_id} = req.params;


    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();

    const place = await Place.findById(req.params.place_id);
    place.reviews.push(review);
    await review.save();
    await place.save();

    req.flash('success_msg', 'Komentar Berhasil Ditambahkan');
    res.redirect(`/places/${place_id}`)
}
module.exports.destroy = async(req, res) => {
    const {place_id, review_id} = req.params;
    await Place.findByIdAndUpdate(place_id, {$pull: {reviews: { _id: review_id }}});
    await Review.findByIdAndDelete(review_id);
    req.flash('success_msg', 'Komentar Berhasil Dihapus');
    res.redirect(`/places/${place_id}`);
}

