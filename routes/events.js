const router = require('express').Router();
const {
  getLetters, getCurrentLetter,
} = require('../controllers/events');

router.get('/letters', getLetters);
router.get('/letters/:uuid', getCurrentLetter);

module.exports = router;