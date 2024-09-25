const Place = require('../models/place');
const fs = require('fs');
const ErrorHandler = require('../utils/ErrorHandler');


module.exports.index = async (req, res) => {
    const places = await Place.find();
    res.render('places/index', { places });
}

module.exports.store = async (req, res, next) => {
    const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));


    const place = new Place(req.body.place);
    place.author = req.user._id
    place.images = images;

    await place.save();

    req.flash('success_msg', 'Berhasil Menambahkan Tempat!');
    res.redirect('/places');
}
module.exports.show = async (req, res) => {
    const place = await Place.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }

        })
        .populate('author');
    res.render('places/show', { place });
}

module.exports.edit = async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', { place });
}
module.exports.update = async (req, res) => {
    const { place } = req.body


    const newPlace = await Place.findByIdAndUpdate(req.params.id, {...place}, { new: true });

    if (req.files && req.files.length > 0) {

        place.images.forEach(image => {
            fs.unlink(image.url, err => new ExpressError(err));
        })

        const images = req.files.map(file => ({
            url: file.path,
            filename: file.filename
        }));

        newPlace.images = images;

        await newPlace.save();
    }

    req.flash('success_msg', 'Berhasi Mengupdate Tempat!');
    res.redirect(`/places/${req.params.id}`);
}

module.exports.destroy =  async (req, res) => {
    // await Place.findByIdAndDelete(req.params.id);
    const {id} = req.params
    const place = await Place.findById(id);

    if(place.images.length > 0) {

        place.images.forEach(image => {
            fs.unlinkSync(image.url, err => new ErrorHandler(err));

        })                
    }
    await place.deleteOne();

    req.flash('success_msg', 'Data Berhasil Dihapus');
    res.redirect('/places');
}
module.exports.destroyImages = async (req, res) => {
    try {
        const { id } = req.params
        const { images } = req.body

        if (!images || images.length === 0) {
            req.flash('error_msg', 'Silahkan Pilih Salah satu Gambar!');
            return res.redirect(`/places/${id}/edit`);
        }

        images.forEach(image => {
            fs.unlinkSync(image);
        });

        await Place.findByIdAndUpdate(
            id,
            { $pull: { images: { url: { $in: images } } } }
        );

        req.flash('success_msg', 'Berhasil Menghapus Gambar');
        return res.redirect(`/places/${id}/edit`);
    } catch (error) {
        req.flash('error_msg', 'Gagal Menghapus Gambar');
        return res.redirect(`/places/${id}/edit`);
    }
}





