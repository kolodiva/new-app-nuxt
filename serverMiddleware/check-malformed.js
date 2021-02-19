export default async (req, res, next) => {

  try {
     decodeURIComponent(req.originalUrl);

     next();
   } catch (e) {

     const url = encodeURI(unescape(req.originalUrl));

     req.url = url;

     next();
   }};
