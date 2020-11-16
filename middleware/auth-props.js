// const consola = require('consola')

export default function ({ $auth, route, redirect, store }) {
  // const userEmail = store.getUserInfoEmail;

  // console.log("userEmail", store.getters["nomenklator/getUserInfoEmail"]);

  if (store.getters["nomenklator/getUserInfoEmail"]) {
    redirect("/");
  }
}
