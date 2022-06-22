const {userLikedTweetsController} = require('../controllers/user-controller');
const express = require('express');
const router = express.Router();

router.get('/liked-tweets', userLikedTweetsController)

module.exports = router;

export {};