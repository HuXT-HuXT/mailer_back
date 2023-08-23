import Handlebars from "handlebars";
import { marked } from "marked";
import Head from "./head.js";
import Header from "./header.js";
import Banner from "./banner.js";
import Announce from "./announce.js";
import Divider from "./divider.js";
import Agenda from "./agenda.js";
import Speaker from "./speaker.js";
import Price from "./price.js";
import Footer from "./footer.js";
import LegalNotice from "./legal-notice.js";

Handlebars.registerHelper("getFirstLetter", function (str) {
    return str[0] + ".";
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
      {{> Footer}}
      {{> LegalNotice}}
  </mj-body>

</mjml>
`;

const template = Handlebars.compile(Base);
export default template;
