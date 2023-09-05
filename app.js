import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { cors } from './middlewares/cors.js';
import {  
  finishEvents,
  finishEvent,
  dashamail,
  proceedCamp,
} from './middlewares/utils.js';

dotenv.config({path: './.env'});

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

app.post('/letters/:id/schedule', (req, res) => {
  const { letter } = req.body;
  dashamail.scheduleCampaign(letter, listId)
    .then((data) => {
      if (data.text === 'OK') {
        res.send({
          meta: {
            err_code: 0,
            text: 'OK',
          }
        });
      } else {
        res.send({
          meta: {
            err_code: 1,
            text: 'NOT OK',
          }
        });
      }
    })
    .catch(err => console.log(err));
})

app.post('/letters/:id/delete', async (req, res) => {
  const uuid = req.params.id;
  const removalStatus = await proceedCamp(uuid);
  console.log(removalStatus.data.response.msg)
  if (removalStatus.text === 'OK') {
    res.send({
      meta: {
        err_code: 0,
        text: 'OK',
      }
    });
  } else {
    res.send({
      meta: {
        err_code: 1,
        text: 'NOT OK',
      }
    });
  }
});

app.listen(PORT, () => {
  console.log('Server up!');
});