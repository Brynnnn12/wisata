const User = require('../models/user')

module.exports.registerform = (req, res) => {
    res.render('auth/register');
    
}

module.exports.register = async(req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if(err) return next(err);
            req.flash('success_msg', 'Selamat Datang Di Nusantara');
            res.redirect('/places');
        })
        
    } catch (error) {
        req.flash('error_msg', error.message);
        res.redirect('/register');
        
    }
}

module.exports.loginform =  (req, res) => {
    res.render('auth/login');
    
}
module.exports.login = (req, res) => {
    req.flash('success_msg', 'Login Berhasil!');
    res.redirect('/places')
}
module.exports.logout = (req, res) => {
    req.logout(function(err){
        if (err) { return next(err) }
        req.flash('success_msg', 'Logout Berhasil!');
        res.redirect('/login');
    });
}