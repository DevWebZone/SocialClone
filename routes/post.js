const express = require('express');
const passport =  require('../config/passport-local');
const router = express.Router();
const post_controller = require('../controllers/posts');

router.post('/create-post', passport.checkAuthentication, post_controller.create);
router.get('/delete-post/', passport.checkAuthentication, post_controller.delete);
router.post('/add-comment', passport.checkAuthentication, post_controller.addComment);
router.get('/delete-comment', passport.checkAuthentication, post_controller.deleteComment);
router.post('/add-friend', passport.checkAuthentication, post_controller.addFriend);
router.get('/toggle-like/', passport.checkAuthentication, post_controller.ToggleLike);
module.exports = router;