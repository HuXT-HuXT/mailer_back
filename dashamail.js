import axios from "axios";

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
      config.params['api_key'] = this.apiKey;
      return config;
    });
  }
  async scheduleCampaign(letter, addressListID) {
    const newCampaign = await this.HTTPClient('?method=campaigns.create',{
      data: {
        list_id: [addressListID],
        name: letter.subject,
        subject: letter.subject,
        external_campaign_id: letter.uuid,
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
    return updateCampaign.data.response.msg;
  }

  async getCampStatus(uuid) {    
    const campStatus = await this.HTTPClient('?method=campaigns.get', {
      data: {
        external_campaign_id: uuid,
      }
    });    
    return campStatus.data.response;
  }

  async removeCamp(id) {
    const removalStatus = await this.HTTPClient('?method=campaigns.delete', {
      data: {
        campaign_id: id,
      }
    });
    return removalStatus;
  }

  async getCampaigns(){
    const campaigns = await this.HTTPClient('?method=campaigns.get');
    return campaigns;
  }
}

export default DashaMail;