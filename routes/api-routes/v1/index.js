const express = require('express');

const router = express.Router();
const controller = require('../../../controllers/api-controllers/v1/posts');
router.get('/posts', controller.index);
router.use('/users', require('./user'));
module.exports = router;