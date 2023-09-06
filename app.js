import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { cors } from './middlewares/cors.js';
import {
  finishEvents,
  finishEvent,
  dashamail,
  removeCamp,
  proceedResponse,
} from './middlewares/utils.js';

dotenv.config({path: './.env'});

const listId = process.env.DASHAMAIL_LIST_ID;

const PORT = 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors);

app.get('/letters', async (req, res) => {
  const answer = await finishEvents();
  res.send({
    data: answer,
    meta: {
      err_code: 0,
      text: 'OK'
    }
  })
});

app.get('/letters/:id', async (req, res) => {
  const uuid = req.params.id;
  const answer = await finishEvent(uuid);
  res.send({
    data: answer,
    meta: {
      err_code: 0,
      text: 'OK'
    }
  })
});

app.post('/letters/:id/schedule', async (req, res) => {
  const uuid = req.params.id;
  const letter = await finishEvent(uuid);  
  dashamail.scheduleCampaign(letter, listId)
    .then((data) => {
      const readyResponse = proceedResponse(data);
      res.send(readyResponse);
    })
    .catch(err => console.log(err));
})

app.post('/letters/:id/delete', async (req, res) => {
  const uuid = req.params.id;
  const removalStatus = await removeCamp(uuid);
  const readyResponse = proceedResponse(removalStatus)
  res.send(readyResponse);
});

app.listen(PORT, () => {
  console.log('Server up!');
});