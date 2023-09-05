import dotenv from 'dotenv';
import DashaMail from "./dashamail.js";
import DataFetcher from './datafetcher.js';
import EventLetter from "./letter.js";
import { letter } from './constants.js';

dotenv.config({path: './.env'});

const baseurl = process.env.DASHAMAIL_BASE_URL;
const apiKey = process.env.DASHAMAIL_API_KEY;
const fromName = process.env.FROM_NAME;
const fromEmail = process.env.FROM_EMAIL;
const listId = process.env.DASHAMAIL_LIST_ID;

const api = new DashaMail(baseurl, apiKey, fromName, fromEmail);

async function main(letter, listId) {
  const newCampaign = await api.scheduleCampaign(letter, listId);
  console.log(newCampaign);
};

const dataFetcher = new DataFetcher(
  process.env.STRAPI_BASE_URL,
  process.env.STRAPI_TOKEN
);

async function getLetters() {
  const events = await dataFetcher.getEvents();
  const eventLetters = events.map((event) => new EventLetter(event));
  return eventLetters;
};

async function getCampaigns() {
  api.getCampaigns()
    .then((data) => {
      data.data.response.data.map((item) => {
        // console.log('___________');
        // console.log('id:', item.id);
        // console.log('name:', item.name);
        // console.log('last_edit_time:', item.last_edit_time);
        // console.log('___________');
        console.log(item);
      })
    })
    .catch(err => console.log(err))

}

async function removeCamp(id) {
  api.removeCamp(id)
    .then(data => console.log(data.data.response.msg))
    .catch(err => console.log(err))
}

async function getStatus(id) {
  api.getCampStatus(id)
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

async function proceedEvent(event) {
  const status = await api.getCampStatus(event.email.uuid);
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
}

async function sum() {
  const events = await dataFetcher.getEvents();
  const array = []
  await Promise.all(
    events.map(async (item) => {    
      array.push(await proceedEvent(item));    
    })
  )
  return array;
}

async function getEventById(uuid) {
  const event = await dataFetcher.getEventByUUID(uuid);
  console.log(event);
}

// getEventById('6aa4b0be-97e6-4052-bf8f-b9026812b904');
// main(letter, listId)
// const fin = await sum();
// console.log('fin:', fin);
// removeCamp(3215809);
// getCampaigns();
getStatus('pew-pew');

// console.log(test[0].uuid);