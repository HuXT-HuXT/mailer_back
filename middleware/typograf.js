import Typograf from "typograf";

export default new Typograf({ locale: ["ru", "en-US"] }).disableRule(
  "common/symbols/cf"
);
