/*
  Reach Socket
  ============

  Stability: 2 - Unstable

  @author  Christoffer Rødvik (C) 2015
  @github  https://github.com/kodemon/reach-socket
  @license MIT
 */

'use strict';

// ### Dependencies

var cluster = require('cluster');

// ### Reach Socket

var reach = module.exports = {};

/**
 * @property io
 * @type     object
 */
reach.io = null;

/**
 * Initiates the socket.io server
 * @method init
 * @param {object} config
 * @param {object} [ssl]
 */
reach.init = function (config, ssl) {
  if (cluster.isMaster) {
    require('./server')(config, ssl);
  }
  this.io = require('./client')(config);
};

/**
 * Inits and returns the koa middleware client
 * @method koa
 * @return {function}
 */
reach.koa = function () {
  return require('./koa')(reach.io);
};

/**
 * Inits and returns the express middleware client
 * @method koa
 * @return {function}
 */
reach.express = function () {
  return function (req, res, next) {
    res.io = reach.io;
    next();
  };
};