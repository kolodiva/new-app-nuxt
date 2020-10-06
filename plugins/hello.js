const consola = require("consola");
export default ({ app }, inject) => {
  inject("hello", (msg) => consola.info(msg));
};
