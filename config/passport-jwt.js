const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user")
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

passport.use(new JwtStrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id).then((user) => {
        if(user)
        {
            return done(null,user);
        }
        else
        {
            return done(null, false);
        }
    });
}));

module.exports = passport;