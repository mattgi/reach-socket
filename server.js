/**
  Reach Socket Server
  ===================

  @author  Christoffer Rødvik (c) 2015
  @github  https://github.com/kodemon/reach-socket
  @license MIT
 */

'use strict';

// ### Dependencies

var fs     = require('fs');
var moment = require('moment');

// ### Debug

var debug = {
  user : require('debug')('socket:user')
};

module.exports = function (config, ssl) {
  var app = create_app(ssl);
  var io  = require('socket.io')(app);

  // ### Redis Adapter
  // If config has redis settings we set up a redis adapter

  if (config.redis) {
    var redis = require('socket.io-redis');
    io.adapter(redis({
      host : config.redis.host,
      port : config.redis.port
    }));
  }

  // ### Origins

  if (config.origins) {
    io.set('origins', config.origins);
  }

  // ### Connect

  io.on('connect', function (socket) {

    // ### Login Event

    socket.on('login', function (user_id) {
      socket.join('reach:user:' + user_id);
      debug.user('%s connected on Socket [%s] @ %s', user_id, socket.id, moment().format('YYYY-MM-DD HH:mm:ss'));
    });

    // ### Disconnect Event

    socket.on('disconnect', function () {
      debug.user('disconnected @ %s [%s]', moment().format('YYYY-MM-DD HH:mm:ss'), socket.id);
    });

  });

  // ### Start ReachSocket

  app.listen(config.port);
};

/**
 * Creates a new application ReachSocket for socket based, supports both HTTP and HTTPS
 * protocols.
 * @param {object} ssl
 */
function create_app(ssl) {
  if (undefined === ssl || !ssl.active) {
    return require('http').createServer(http_response);
  } else {
    var files = ssl.certs.ca;
    var ca    = get_certifications(files, ssl.certs);

    return require('https').createServer({
      ca   : ca,
      key  : fs.readFileSync(ssl.certs.path + ssl.certs.key),
      cert : fs.readFileSync(ssl.certs.path + ssl.certs.cert)
    }, http_response);
  }
}

/**
 * Get the certifications from the paths provided in the config
 * @param  {array}  files
 * @param  {object} certs
 * @return {array}
 */
function get_certifications(files, certs) {
  var result = [];
  files.forEach(function(file) {
    result.push(fs.readFileSync(certs.path + file));
  });
  return result;
}

/**
 * Socket response when entering socket.io uri
 * @param {object} req
 * @param {object} res
 */
function http_response(req, res) {
  res.writeHead(200, {
    'X-Powered-By' : 'nodejs'
  });
  res.end('Reach Socket > Instance is running');
}