Reach Socket
============

Bringing you a stable solution to running a socket.io server in a cluster environment, the solution is basicaly running a socket.io server on the master and use [socket.io-redis](https://www.npmjs.com/package/socket.io-redis) and [socket.io-emitter](https://www.npmjs.com/package/socket.io-emitter) to put it all together.

### Install

```sh
# Install
$ npm install reach-socket --save
```

#### Socket Config

```js
var config = {
  port    : 5000,
  origins : 'http://localhost:3000',
  redis : {
    host : 'localhost',
    port : 6379
  }
}
```

#### SSL Config (Optional)

```js
var ssl = {
  active : false, // If set to false the server will run in http
  certs  : {
    path : 'path/to/ssl',
    key  : 'certification.key',
    cert : 'certification.crt',
    ca   : [
      'certification.crt',
      'certification.crt',
      'certification.crt'
    ]
  }
},
```

### Server

Before you can register the middleware you will need to initiate the socket.io server.

```js
var socket = require('reach-socket');

socket.init(config, ssl);
```

**Direct**

You can send emits directly from the socket once it has been initiated.

```js
socket.io.emit('event', arguments);
socket.io.user('user_id').emit('event', arguments);
```

**KOA**

Register the socket io instance as koa middleware.

```js
app.use(socket.koa());
app.use(function *() {
  this.io.emit('event', arguments);
  this.io.user('user_id').emit('event', arguments);
});
```

**Express**

Register the socket io instance as express middleware.

```js
app.use(socket.express());
app.use(function (req, res) {
  res.io.emit('event', arguments);
  res.io.user('user_id').emit('event', arguments);
});
```

### Front End

Include socket.io client in your html, this should be directly accessible on your server domain with the assigned socket port.

```html
<html>
  <head>
    <title>Front End Test</title>
    <script src="http://localhost:5000/socket.io/socket.io.js"></script>
  </head>
  <body>
    <!-- Your HTML Body -->
  </body>
</html>
```

Once you got access to socket.io client you can connect and start receiving events.

```js
var socket = io('http://localhost:5000');

socket.on('event', function (arguments) {
  // ...
});
```

Authenticate a user with the socket to enable private messaging

```js
socket.emit('login', 'user_id');
```

### License

The MIT License (MIT)

Copyright (c) 2015 Christoffer Rødvik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.