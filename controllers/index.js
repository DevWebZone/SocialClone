module.exports.home = function(req, res){
    return res.render("home", {
        title : "home"
    })
}
module.exports.signup = function(req, res){
    if(req.isAuthenticated())
        return res.redirect('/users/profile');
    return res.render("sign-up", {
        title : "Sign Up"
    })
}
module.exports.signin = function(req, res){
    if(req.isAuthenticated())
        return res.redirect('/users/profile');
    return res.render("sign-in", {
        title : "Sign In"
    })
}
module.exports.signout = function(req, res, next){ 
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged out!!');
        res.redirect('/');
    } );
}
