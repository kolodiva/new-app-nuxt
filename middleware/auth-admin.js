// const consola = require('consola')

export default function ({ $auth, route, redirect, store }) {
  const userEmail = store.getters["nomenklator/getUserInfoEmail"];
  console.log(userEmail);
  if (
    !userEmail ||
    userEmail !== "afmc@mail.ru" ||
    userEmail !== "adv.mfc@gmail.com"
  ) {
    redirect("/");
  }
}
