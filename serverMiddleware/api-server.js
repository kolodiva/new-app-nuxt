export default async (req, res, next) => {

  //console.log(req._parsedUrl.pathname)

  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");

  url = url.split("/");

  let method = url.pop();

  let controller = url.slice(1).join("/");

  if (method === 'userAuth') {
    const keyUser = req.cookies['auth._token.local'];
    req.params.keyUser = keyUser && keyUser.replace('Bearer ', '') || undefined;
  }

  let api = require("../api/" + controller);

  req.params.connectionid = req.cookies.connectionid;

  let result = await api[ method ](req.params, res);

  //res.setHeader("Set-Cookie", "SameSite=None; Secure");

  if (result.status) {
    res.status(result.status).end(result.msg);
  } else {
    res.end(JSON.stringify(result));
  }

};
