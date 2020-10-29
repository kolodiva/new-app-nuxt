export default (context, inject) => {
  inject("api", async (method, params) => {
    // const controller = "";
    try {
      return await context.$axios["$" + (params ? "post" : "get")](
        "/api/" + method,
        params
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
};
