// const consola = require('consola')
export default function ({ route, store, redirect }) {
  // console.log(route);
  if (route.fullPath === "/" || route.path === "/") {
    return;
  }
  if (process.server) {
    let newPath = route.path.toLowerCase();
    let changed = route.path !== newPath;

    if (route.path.endsWith("/")) {
      changed = true;
      newPath = route.path.slice(0, -1);
    }

    if (changed) {
      redirect(301, route.fullPath.replace(route.path, newPath));
    }
  }
}
