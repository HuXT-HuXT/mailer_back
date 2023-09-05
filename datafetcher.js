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
        uuid: entry.attributes.uuid,
        title: entry.attributes.title,
        eventType: entry.attributes.event_type,
        agenda: entry.attributes.agenda.split("\n"),
        agendaTitle: entry.attributes.agenda_title,
        registrationUrl: entry.attributes.registration_url,
        banner: entry.attributes.banner.data.attributes.url,
        startDate: entry.attributes.start_date,
        endDate: entry.attributes.end_date,
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
          subject: entry.attributes.email_subject,
          sendDatetime: entry.attributes.email_send_datetime,
          uuid: entry.attributes.uuid,
        },
      };
      events.push(event);
    }

    return events;
  }

  async getEventByUUID(uuid) {
    const eventResponseData = await this.HTTPClient.get(
      `/api/events?filters[uuid][$eq]=${uuid}&populate[speaker][populate]=photo&populate[banner]=*`
    );

    const entry = eventResponseData.data.data[0];

      const event = {
        uuid: entry.attributes.uuid,
        title: entry.attributes.title,
        eventType: entry.attributes.event_type,
        agenda: entry.attributes.agenda.split("\n"),
        agendaTitle: entry.attributes.agenda_title,
        registrationUrl: entry.attributes.registration_url,
        banner: entry.attributes.banner.data.attributes.url,
        startDate: entry.attributes.start_date,
        endDate: entry.attributes.end_date,
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
          subject: entry.attributes.email_subject,
          sendDatetime: entry.attributes.email_send_datetime,
          uuid: entry.attributes.uuid,
        },
      };

    return event;
  }
}

export default DataFetcher;
