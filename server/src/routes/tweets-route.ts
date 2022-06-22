const {getTweetsController, addTweetController, deleteTweetController, likeTweetController} = require('../controllers/tweets-controller');

const express = require('express');
const router = express.Router();

router.get('/list', getTweetsController);
router.post('/add', addTweetController);
router.delete('/delete/:id', deleteTweetController);
router.post('/like/:id', likeTweetController);


module.exports = router;