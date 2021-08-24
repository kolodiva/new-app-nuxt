export default (req, res, next) => {

  try {
     decodeURIComponent(req.originalUrl);
   } catch (e) {
     const url = encodeURI(unescape(req.originalUrl));
     req.url = url;
   }

 
   next();


 };
