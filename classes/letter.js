const mjml2html = require("mjml");
const template = require("../middleware/templates/_base.js");
const mailTypograf = require("../middleware/typograf.js");

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
    const emailBody = mailTypograf.execute(htmlTemplate.html);

    return emailBody;
  }
}

module.exports = { EventLetter };
