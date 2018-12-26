const proxy = require('http-proxy-middleware');
    module.exports = function(server) {
    server.use(proxy('/api/', 
                   { target: 'http://localhost:5000' }
      ));
    }