// const consola = require('consola')
export default function ({ route, store, redirect }) {
  // console.log(route);
  if (route.fullPath === "/" || route.path === "/") {
    return;
  }
  if (process.server) {
    let fullPath = "";
    let advsPath = "";
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

    if (route && route.path && route.path.includes("/advs/")) {
      let tmpPath0 = route.path;

      const aPath0 = tmpPath0.split("/");

      const aPath1 = aPath0.filter(function (el) {
        return el !== "";
      });

      tmpPath0 = "/" + aPath1.join("/");

      if (!tmpPath0.includes(".html")) {
        tmpPath0 = tmpPath0 + ".html";
      }

      advsPath = tmpPath0;

      changed = true;
    }

    if (changed) {
      if (advsPath) {
        redirect(301, advsPath);
      } else if (fullPath) {
        redirect(301, fullPath);
      } else {
        redirect(301, route.fullPath.replace(route.path, newPath));
      }
    }
  }
}
