const express = require('express');
const passport =require('../../../config/passport-jwt');
const router = express.Router();
const userController = require('../../../controllers/api-controllers/v1/users-api');
router.get('/signin', userController.signin);
router.get('/profile', passport.authenticate('jwt', {session: false})  ,userController.profile);

module.exports = router;