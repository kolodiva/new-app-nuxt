export default ({ app }, inject) => {
  inject("authinfo", (auth) => {
    const token =
      (auth.$storage.getCookie("_token.local") &&
        auth.$storage.getCookie("_token.local").replace("Bearer ", "")) ||
      undefined;

    const userid = (auth.user && auth.user.id) || 1;

    return { userid, token };
  });
};
