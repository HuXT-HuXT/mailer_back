import dotenv from 'dotenv';
import {
  finishEvents,
  finishEvent,
  dashamail,
  removeCamp,
  proceedResponse,
} from '../middlewares/utils.js';
import {
  OK,
  NOT_OK,
} from '../constants/constants.js';

dotenv.config({path: './.env'});

const listId = process.env.DASHAMAIL_LIST_ID;

const getEvents = async (req, res) => {
  const events = await finishEvents();
  res.send({
    data: events,
    meta: OK,
  })
};

const getEvent = async (req, res) => {
  const uuid = req.params.id;
  const event = await finishEvent(uuid);
  res.send({
    data: event,
    meta: OK,
  })
};

const scheduleCampaign = async (req, res) => {
  const uuid = req.params.id;
  const letter = await finishEvent(uuid);
  dashamail.scheduleCampaign(letter, listId)
    .then((data) => {
      const readyResponse = proceedResponse(data);
      res.send(readyResponse);
    })
    .catch(err => console.log(err));
};

const removeCampaign = async (req, res) => {
  const uuid = req.params.id;
  const removalStatus = await removeCamp(uuid);
  const readyResponse = proceedResponse(removalStatus)
  res.send(readyResponse);
};

export {
  getEvents,
  getEvent,
  scheduleCampaign,
  removeCampaign,
};