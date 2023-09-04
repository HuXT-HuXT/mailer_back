import dotenv from 'dotenv';
import DashaMail from "./dashamail.js";
import DataFetcher from './datafetcher.js';
import EventLetter from "./letter.js";

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

// main(letter, listId);

const dataFetcher = new DataFetcher(
  process.env.STRAPI_BASE_URL,
  process.env.STRAPI_TOKEN
);

async function getLetters() {
  const events = await dataFetcher.getEvents();
  const eventLetters = events.map((event) => new EventLetter(event));
  return eventLetters;
};

// const test = await getLetters();

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

async function test() {
  const events = [];
  dataFetcher.getEvents()
    .then((data) => {
      data.map((item) => {
        // console.log(item.email.uuid);
        return api.getCampStatus(item.email.uuid)
          .then((upData) => {
            if (upData.msg.text === 'OK') {
            //   res.send({
            //   status: data.data[0].status,
            // });

            } else {
              // res.send({ status: 'DRAFT' });
            }
          })
      })
    })
    .catch(err => console.log())

  return events;
};

const newTest = await test();
console.log(newTest);

// removeCamp(3209498);
// getCampaigns();
// getStatus('3209505');

// console.log(test[0].uuid);