// const consola = require('consola')
export default function ({ route, store, redirect }) {
  if (process.server) {
    //console.log(route);
    let fullPath = "";
    let newPath = route.path.toLowerCase();
    let changed = route.path !== newPath;

    if (route.path.endsWith("/")) {
      changed = true;
      newPath = route.path.slice(0, -1);
    }

    if (route.query && route.query.itemcard) {
      fullPath = newPath + "/" + route.query.itemcard.toLowerCase();
      if (fullPath.endsWith("/")) {
        fullPath = fullPath.slice(0, -1);
      }
      changed = true;
    }

    if (changed) {
      if (fullPath) {
        redirect(301, fullPath);
      } else {
        redirect(301, route.fullPath.replace(route.path, newPath));
      }
    }
  }
}
