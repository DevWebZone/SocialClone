const express = require('express');

const router = express.Router();
const controller = require('../controllers/index');
router.get('/', controller.home);
router.get('/sign-up', controller.signup);
router.get('/sign-in', controller.signin);
router.get('/sign-out', controller.signout);

router.use('/users', require('./users'));
router.use('/posts', require('./post'));
console.log("test");
module.exports = router;