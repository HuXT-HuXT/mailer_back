import mjml2html from "mjml";
import template from "../middleware/templates/_base.js";
import Typograf from "../middleware/typograf.js";

class EventLetter {
  constructor(event) {
    this.subject = event.email.subject;
    this.body = this.constructor.renderHTML(event);
    this.sendDatetime = event.email.sendDatetime;
  }

  static renderHTML(event) {
    console.log('render process has begun!')
    const mjmlTemplate = template(event);
    const htmlTemplate = mjml2html(mjmlTemplate);
    const emailBody = Typograf.execute(htmlTemplate.html);

    return emailBody;
  }
}

export default EventLetter;
