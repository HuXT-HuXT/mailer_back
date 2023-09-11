import express from 'express';
import bodyParser from 'body-parser';
import { cors } from './middlewares/cors.js';
import router from './routes/letters.js';
import auth from './middlewares/auth.js';

const PORT = 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors);

app.use(auth);
app.use(router);

app.listen(PORT, () => {
  console.log('Server up!');
});