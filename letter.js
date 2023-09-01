import mjml2html from "mjml";
import template from "./templates/_base.js";
import Typograf from "./typograf.js";

class EventLetter {
  constructor(event) {
    this.subject = event.email.subject;
    this.body = this.constructor.renderHTML(event);
    this.sendDatetime = event.email.sendDatetime;
    this.uuid = event.email.uuid;
  }

  static renderHTML(event) {    
    const mjmlTemplate = template(event);
    const htmlTemplate = mjml2html(mjmlTemplate);
    const emailBody = Typograf.execute(htmlTemplate.html);    
    return emailBody;
  }
}

export default EventLetter;
