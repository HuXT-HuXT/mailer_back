
import { Router } from 'express';
import {
  getEvents,
  getEvent,
  scheduleCampaign,
  removeCampaign,
} from '../controllers/letters.js';

const router = Router();

router.get('/letters', getEvents);
router.get('/letters/:id', getEvent);
router.post('/letters/:id/schedule', scheduleCampaign);
router.post('/letters/:id/delete', removeCampaign);

export default router;