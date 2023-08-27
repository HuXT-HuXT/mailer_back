const { DashaMail } = require('../classes/dashaMail');

const baseurl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
const fromName = process.env.FROM_NAME;
const fromEmail = process.env.FROM_EMAIL;

const campaignApi = new DashaMail(baseurl, apiKey, fromName, fromEmail);

async function scheduleCampaign(req, res) {
  const { letter, listId } = req.body;
  const uuid = req.params;
  const newCamp = await campaignApi.scheduleCampaign(letter, listId, uuid);
  res.send({ data: newCamp });
}

async function getStatus(req, res) {
  const uuid = req.params;
  const campStatus = await campaignApi.getCampaignStatus(uuid);
  res.send({ data: campStatus });
}

async function removeCamp(req, res) {
  const { id } = req.body;
  const campStatus = await campaignApi.removeCampaign(id);
  res.send({ data: campStatus });
}

module.exports = {
  scheduleCampaign,
  getStatus,
  removeCamp,
}