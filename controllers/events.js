const {DataFetcher} = require('../classes/dataFetcher');
const {EventLetter} = require('../classes/letter');

const eventApi = new DataFetcher(
  process.env.STRAPI_BASE_URL,
  process.env.STRAPI_TOKEN
);

async function getLetters(req, res) {
  const events = await eventApi.getEvents();
  const eventLetters = events.map(event => new EventLetter(event));
  res.send({ data: eventLetters});
};

async function getCurrentLetter(req, res) {
  const { uuid } = req.params;
  const event = await eventApi.getEvent(uuid);
  const eventLetter = new EventLetter(event);
  res.send({ data: eventLetter });
};

module.exports = {
  getLetters,
  getCurrentLetter
};