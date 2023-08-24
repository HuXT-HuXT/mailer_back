import DataFetcher from '../classes/dataFetcher.js';
import EventLetter from '..//classes/letter.js';

const eventApi = new DataFetcher(
  process.env.STRAPI_BASE_URL,
  process.env.STRAPI_TOKEN
);

async function getLetters() {
  const events = await eventApi.getEvents();
  const eventLetters = events.map(event => new EventLetter(event));
  return eventLetters;
};

async function getCurrentLetter(uuid) {
  const event = await eventApi.getEvent(uuid);
  const eventLetter = new EventLetter(event);
  return eventLetter;
};

export {
  getLetters,
  getCurrentLetter
};