module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error_msg', 'Silahkan Login Terlebih Dahulu.');
        return res.redirect('/login');
    }
    next();
};
