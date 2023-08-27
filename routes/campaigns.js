const router = require('express').Router();
const {
  scheduleCampaign,
  getStatus,
  removeCamp,
} = require('../controllers/campaigns');

router.get('/letters/:uuid', getStatus);
router.post('/letters/:uuid/schedule', scheduleCampaign);
router.post('/letters/:uuid/delete', removeCamp);

module.exports = router;