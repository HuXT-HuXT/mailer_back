const router = require('express').Router();
const {
  getLetters,
} = require('../controllers/events');

router.get('/letters', getLetters);

module.exports = router;