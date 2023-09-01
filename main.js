import dotenv from 'dotenv';
import DashaMail from "./dashamail.js";
import DataFetcher from "./datafetcher.js";
import EventLetter from "./letter.js";

dotenv.config({path: './.env'});

const baseurl = process.env.DASHAMAIL_BASE_URL;
const apiKey = process.env.DASHAMAIL_API_KEY;
const fromName = process.env.FROM_NAME;
const fromEmail = process.env.FROM_EMAIL;
const listId = process.env.DASHAMAIL_LIST_ID;

async function main() {
  const dataFetcher = new DataFetcher(
    process.env.STRAPI_BASE_URL,
    process.env.STRAPI_TOKEN
  );
  const events = await dataFetcher.getEvents();
  const eventLetters = events.map((event) => new EventLetter(event));
  const dashamail = new DashaMail(baseurl, apiKey, fromName, fromEmail);
  eventLetters.map((letter) => dashamail.scheduleCampaign(letter, listId));
}

main();
