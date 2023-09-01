import axios from "axios";

class DataFetcher {
  constructor(baseURL, token) {
    this.HTTPClient = axios.create();
    this.HTTPClient.defaults.baseURL = baseURL;
    this.HTTPClient.defaults.headers.common = {
      Authorization: `bearer ${token}`,
    };
  }

  async getEvents() {
    const eventsResponseData = await this.HTTPClient.get(
      "/api/events?populate[speaker][populate]=photo&populate[banner]=*"
    );

    const eventsData = eventsResponseData.data.data;

    const events = [];

    for (const entry of eventsData) {
      const event = {
        id: entry.id,
        title: entry.attributes.title,
        agenda: entry.attributes.agenda.split("\n"),
        registrationUrl: entry.attributes.registration_url,
        banner: entry.attributes.banner.data.attributes.url,
        date: entry.attributes.date,
        startTime: entry.attributes.start_time,
        endTime: entry.attributes.end_time,
        price: entry.attributes.price,
        procurementPrice: entry.attributes.procurement_price,
        discountPercent: entry.attributes.discount_percent,
        speaker: {
          firstName: entry.attributes.speaker.data.attributes.first_name,
          middleName: entry.attributes.speaker.data.attributes.middle_name,
          lastName: entry.attributes.speaker.data.attributes.last_name,
          lastNameGenitive:
            entry.attributes.speaker.data.attributes.last_name_genitive,
          regalia: entry.attributes.speaker.data.attributes.regalia,
          photo:
            entry.attributes.speaker.data.attributes.photo.data.attributes.url,
        },
        upcomingEvents: [],
        email: {
          subject: entry.attributes.email_title,
          sendDatetime: entry.attributes.send_datetime,
          uuid: entry.attributes.uuid,
        },
      };
      events.push(event);
    }

    return events;
  }
}

export default DataFetcher;
