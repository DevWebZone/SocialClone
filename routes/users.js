const express = require('express');
const passport =  require('../config/passport-local');
const router = express.Router();
const user_controller = require('../controllers/user-controllers');
router.get('/profile', passport.checkAuthentication, user_controller.profile);
router.post('/create-user', user_controller.signup);
router.post('/login-user', 
passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'}
), 
user_controller.signin);
router.post('/add-avatar/:id', passport.checkAuthentication, user_controller.update);
console.log("test1");
module.exports = router;