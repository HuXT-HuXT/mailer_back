const Handlebars = require ("handlebars");
const { marked } = require ("marked");
const Head = require ("./head.js");
const Header = require ("./header.js");
const Banner = require ("./banner.js");
const Announce = require ("./announce.js");
const Divider = require ("./divider.js");
const Agenda = require ("./agenda.js");
const Speaker = require ("./speaker.js");
const Price = require ("./price.js");
const Footer = require ("./footer.js");
const LegalNotice = require ("./legal-notice.js");
const UpcomingEvents = require ("./upcoming-events.js");

Handlebars.registerHelper("getFirstLetter", function (str) {
    return str ? str[0] + "." : "";
});

Handlebars.registerHelper("getDayAndMonth", function (dateStr) {
    let date = new Date(dateStr);
    return date.toLocaleDateString("ru-ru", { month: "long", day: "numeric" });
});

Handlebars.registerHelper("getTime", function (timeStr) {
    let time = timeStr.split(":");
    return time[0] + ":" + time[1];
});

Handlebars.registerHelper("markdown", function (str) {
    return marked.parse(str);
});

Handlebars.registerHelper("raw", function (str) {
    return str.fn();
});

Handlebars.registerPartial("Head", Head);
Handlebars.registerPartial("Header", Header);
Handlebars.registerPartial("Banner", Banner);
Handlebars.registerPartial("Announce", Announce);
Handlebars.registerPartial("Divider", Divider);
Handlebars.registerPartial("Agenda", Agenda);
Handlebars.registerPartial("Speaker", Speaker);
Handlebars.registerPartial("Price", Price);
Handlebars.registerPartial("Footer", Footer);
Handlebars.registerPartial("LegalNotice", LegalNotice);
Handlebars.registerPartial("UpcomingEvents", UpcomingEvents);

const Base = `
<mjml lang="ru">

  <mj-head>
      <mj-title>{{ title }}</mj-title>
      {{> Head}}
  </mj-head>

  <mj-body background-color="#eee">
      {{> Header}}
      {{> Banner}}
      {{> Announce}}
      {{> Divider}}
      {{> Agenda}}
      {{> Divider}}
      {{> Speaker}}
      {{> Divider}}
      {{> Price}}
      {{#if upcomingEvents}}
          {{> Divider}}
          {{> UpcomingEvents}}
      {{/if}}
      {{> Footer}}
      {{> LegalNotice}}
  </mj-body>

</mjml>
`;

const template = Handlebars.compile(Base);
module.exports = { template };
