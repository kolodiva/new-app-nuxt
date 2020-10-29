export default (context, inject) => {
  inject("api", async (method, params) => {
    // const controller = "";
    try {
      //let api = require("../api/index" + controller.replace(/^\/+|\/+$|\.+/g, ""));
      let api = require("../api/");
      return await api[method](params);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
};
