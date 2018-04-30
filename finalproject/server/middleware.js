
var middleware = function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  next();

};

module.exports = middleware;
