const axios =  require("axios");

class DashaMail {
  constructor(baseurl, apiKey, fromName, fromEmail) {
    this.baseurl = baseurl;
    this.apiKey = apiKey;
    this.fromName = fromName;
    this.fromEmail = fromEmail;
    this.HTTPClient = axios.create({
      baseURL: this.baseurl,
    });
    this.HTTPClient.interceptors.request.use(config => {      
      config.params = config.params || {};
      config.params['api_key'] = apiKey;
      return config;
    });
  }
  async scheduleCampaign(letter, addressListID) {
    const newCampaign = await this.HTTPClient('?method=campaigns.create',{
      data: {
        list_id: [addressListID],
        name: letter.subject,
        subject: letter.subject,
        html: letter.body,
        from_name: this.fromName,
        from_email: this.fromEmail,
      }
    });
    const campId = newCampaign.data.response.data.campaign_id;
    const updateCampaign = await this.HTTPClient('?method=campaigns.update', {
      data: {
        campaign_id: campId,
        status: 'SCHEDULE',
        delivery_time: letter.sendDatetime,
      }
    });
    return updateCampaign.data.response.msg.err_code;
  }
};

module.exports = { DashaMail };