export default async (req, res, next) => {

  //console.log(req._parsedUrl.pathname)
  // console.log( 'api-server' );
  // console.log( req.cookies );

  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");

  url = url.split("/");

  let method = url.pop();

  let controller = url.slice(1).join("/");

  //req.params.connectionid = req.cookies && req.cookies.connectionid || undefined;

  if (method === 'loginUser') {
    req.params.keyUser = req.cookies['_keyUser'];
  }

  let api = require("../api/" + controller);

  let result = await api[ method ](req.params, res);

  //res.setHeader("Set-Cookie", "SameSite=None; Secure");

  if (result.status) {
    res.status(result.status).end(result.msg);
  } else {
    res.end(JSON.stringify(result));
  }

};
