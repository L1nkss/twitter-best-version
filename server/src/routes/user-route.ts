const {getUserLikedTweetsController} = require('../controllers/user-controller');
const express = require('express');
const router = express.Router();

router.get('/liked/:id', getUserLikedTweetsController)

module.exports = router;

export {};