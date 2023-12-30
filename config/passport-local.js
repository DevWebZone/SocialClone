const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
    usernameField : "email"

},  function(email, password, done)
    {
        User.findOne({email: email}).then((user) =>{
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false)
            }
            return done(null, user);
        })
    }
    
));

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(userId, done){
    console.log(userId);
    User.findById(userId).populate('friends').then((user) => {
        
        return done(null, user);
    })
})
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    next();
}

module.exports =  passport;