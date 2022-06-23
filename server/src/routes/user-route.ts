const {getUserLikedTweetsController, addTweetToLikedTweetsController, deleteTweetFromLikedController} = require('../controllers/user-controller');
const express = require('express');
const router = express.Router();

router.get('/liked/:id', getUserLikedTweetsController);
router.post('/like-tweet-add', addTweetToLikedTweetsController)
router.delete('/delete-liked-tweet/:userId/:tweetId', deleteTweetFromLikedController)

module.exports = router;

export {};