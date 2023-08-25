const express = require('express');
const bodyParser = require('body-parser');

const PORT = 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(require('./routes/events'));

app.listen(PORT, () => {
  console.log('Server Up!')
})