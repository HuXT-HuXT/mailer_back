import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import DashaMail from "./dashamail.js";
import DataFetcher from './datafetcher.js';
import EventLetter from "./letter.js";
import { cors } from './middlewares/cors.js';

dotenv.config({path: './.env'});

const PORT = 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors);

const dataFetcher = new DataFetcher(
  process.env.STRAPI_BASE_URL,
  process.env.STRAPI_TOKEN
);

const baseurl = process.env.DASHAMAIL_BASE_URL;
const apiKey = process.env.DASHAMAIL_API_KEY;
const fromName = process.env.FROM_NAME;
const fromEmail = process.env.FROM_EMAIL;
const listId = process.env.DASHAMAIL_LIST_ID;

const dashamail = new DashaMail(baseurl, apiKey, fromName, fromEmail);

// app.get('/letters', (req, res) => {
//   dataFetcher.getEvents()
//     .then((events) => {
//       const eventLetters = events.map((event) => {
//         return {
//           title: event.title,
//           photo: event.speaker.photo,
//           letter: new EventLetter(event),
//         }
//       })
//       res.send({ data: eventLetters });
//     })
//     .catch(err => console.log(err));
// })

app.post('/letters/:id/schedule', (req, res) => {
  const { letter } = req.body;
  dashamail.scheduleCampaign(letter, listId)
    .then(data => res.send({data}))
    .catch(err => console.log(err));
})

// --------------------TEST-------------------
app.get('/letters', async (req, res) => {
  const events = await dataFetcher.getEvents();
  const updatedEvents = events.map((event) => {
    return dashamail.getCampStatus(event.email.uuid)
      .then((dashaData) => {
        let dashaStatus;
        if (dashaData.msg.text === 'OK') {
          dashaStatus = dashaData.data[0].status;
        } else {
          dashaStatus = 'DRAFT';
        }
        return {
          uuid: event.email.uuid,
          subject: event.email.subject,
          body: new EventLetter(event).body,
          sendDateTime: event.email.sendDateTime,
          status: dashaStatus,
        }
      });
    // const dashaData = await dashamail.getCampStatus(event.email.uuid)
    // console.log(dashaData);
    // let dashaStatus;
    // if (dashaData.msg.text === 'OK') {
    //   dashaStatus = dashaData.data[0].status;
    // } else {
    //   dashaStatus = 'DRAFT';
    // }
    // return {
    //   uuid: event.email.uuid,
    //   subject: event.email.subject,
    //   body: new EventLetter(event).body,
    //   sendDateTime: event.email.sendDateTime,
    //   status: dashaStatus,
    // }
  })
  res.send({
    data: updatedEvents,
    meta: {
      err_code: 0,
      text: 'OK',
    }
  })
})
// --------------------TEST-------------------

app.get('/letters/:id/status', (req, res) => {
  const uuid = req.params;
  dashamail.getCampStatus(uuid.id)
    .then((data) => {
      if (data.msg.text === 'OK') {
        res.send({
          status: data.data[0].status,
        });
      } else {
        res.send({ status: 'DRAFT' });
      }
    })
    .catch(err => console.log(err))
});

app.post('/letters/:id/delete', (req, res) => {
  const { id } = req.body;
  dashamail.removeCamp(id)
    .then(data => res.send({ data: data.data.response.msg }))
    .catch(err => console.log(err))
});

app.listen(PORT, () => {
  console.log('Server up!');
});