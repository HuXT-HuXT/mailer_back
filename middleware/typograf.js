const Typograf = require("typograf");

const mailTypograf = new Typograf({ locale: ["ru", "en-US"] }).disableRule(
  "common/symbols/cf"
);

module.exports = { mailTypograf };