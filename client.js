/**
  Reach Socket Client
  ===================

  Client socket uses socket.io-emitter to allow clustered instances to communicate with a seperate
  socket.io server.

  @author  Christoffer Rødvik (c) 2015
  @github  https://github.com/kodemon/reach-socket
  @license MIT
 */

'use strict';

module.exports = function (config) {
  var io = require('socket.io-emitter')({
    host : config.redis.host,
    port : config.redis.port
  });

  io.user = function (user_id) {
    return io.to('reach:user:' + user_id);
  };

  return io;
};