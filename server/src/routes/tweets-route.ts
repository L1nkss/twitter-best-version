const {getTweetsController} = require('../controllers/tweets-controller');

const express = require('express');
const router = express.Router();

router.get(`/list`, getTweetsController)


module.exports = router;