import dotenv from 'dotenv';
import DashaMail from "../dashamail.js";
import EventLetter from "../letter.js";
import DataFetcher from '../datafetcher.js';

dotenv.config({path: './.env'});

const baseurl = process.env.DASHAMAIL_BASE_URL;
const apiKey = process.env.DASHAMAIL_API_KEY;
const fromName = process.env.FROM_NAME;
const fromEmail = process.env.FROM_EMAIL;
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN

const dashamail = new DashaMail(baseurl, apiKey, fromName, fromEmail);
const dataFetcher = new DataFetcher(
  STRAPI_BASE_URL,
  STRAPI_TOKEN,
);

async function proceedEvent(event) {
  const status = await dashamail.getCampStatus(event.email.uuid);
  let updatedEvent;
  if (status.msg.text === 'OK') {
    updatedEvent = {
      uuid: event.email.uuid,
      subject: event.email.subject,
      body: new EventLetter(event).body,
      sendDateTime: event.email.sendDateTime,
      status: status.data[0].status,
    }
  } else {
    updatedEvent = {
      uuid: event.email.uuid,
      subject: event.email.subject,
      body: new EventLetter(event).body,
      sendDateTime: event.email.sendDateTime,
      status: 'DRAFT',
    }
  }
  return updatedEvent;
};

async function finishEvents() {
  const events = await dataFetcher.getEvents();
  const updatedEvents = [];
  await Promise.all(
    events.map(async (item) => {
      updatedEvents.push(await proceedEvent(item));
    })
  )
  return updatedEvents;
};

async function finishEvent(uuid) {
  const event = await dataFetcher.getEventByUUID(uuid);
  const updatedEvent = await proceedEvent(event);
  return updatedEvent;
};

async function removeCamp(uuid) {
  const campId = await dashamail.getCampStatus(uuid)
  let removalStatus;
  if (campId.msg.text === 'OK') {
    removalStatus = (await dashamail.removeCamp(campId.data[0].id)).data.response.msg
  } else {
    removalStatus = {
      err_code: 1,
      text: 'NOT OK',
      type: 'message',
    } ;
  }
  return removalStatus;
}

function proceedResponse(result) {
  let response
  if (result.text === 'OK') {
    response = {
      meta: {
        err_code: 0,
        text: 'OK',
      }
    }
  } else {
    response = {
      meta: {
        err_code: 1,
        text: 'NOT OK',
      }
    }
  }
  return response;
}

export {
  proceedEvent,
  finishEvents,
  finishEvent,
  removeCamp,
  proceedResponse,
  dashamail,
  dataFetcher,
};