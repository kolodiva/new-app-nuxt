export default (context, inject) => {
  inject("api", async (controller, method, params) => {
    try {
      let api = require("../api/" + controller.replace(/^\/+|\/+$|\.+/g, ""));
      return await api[method](params);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
};
