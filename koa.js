/**
  Reach Socket KOA
  ================

  Since koa uses --harmony features we need to isolate the generator function from running
  when koa is not used.

  @author  Christoffer Rødvik (c) 2015
  @license MIT
 */

'use strict';

module.exports = function (io) {
  return function *(next) {
    this.io = io;
    yield next;
  };
};