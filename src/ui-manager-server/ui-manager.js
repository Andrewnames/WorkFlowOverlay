const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const portNumber = 3005;
const logger = require('../ui-manager-server/logging/logger').getLogger(__filename.slice(__dirname.length + 1));

http.listen(portNumber, () => {
  console.log('Listening on port ' + String(portNumber));
  logger.info('Listening on port ' + String(portNumber));
});

io.on('connection', socket => {
  // to emit-recieve message content
  socket.on('private message', function (msg) {
    logger.info('New Message ', msg);
    io.sockets.emit('txt', msg);
    io.sockets.emit('this', msg);
  });

  // ----------- Message from WCRU --------------------
  socket.on('CommandFromWCRU', function (command) {
    logger.info('Command From WCRU ', command);

    io.sockets.emit('CommandFromWCRU', command);

  });

  socket.on('NotificationFromWCRU', function (uar) {
    logger.info('UAR From WCRU ', uar);

    io.sockets.emit('NotificationFromWCRU', uar);

  });
  socket.on('DataFromWCRU', function (data) {
    logger.info('UAR From WCRU ', data);

    io.sockets.emit('DataFromWCRU', data);

  });

  // ----------- Message from Overlay --------------------
  socket.on('CommandFromOverlay', function (command) {
    logger.info('Command From Overlay ', command);

    io.sockets.emit('CommandFromOverlay', command);

  });

  socket.on('NotificationFromOverlay', function (uar) {
    logger.info('UAR From Overlay ', uar);

    io.sockets.emit('NotificationFromOverlay', uar);

  });

  socket.on('DataFromOverlay', function (data) {
    logger.info('Data From Overlay ', data);

    io.sockets.emit('DataFromOverlay', data);

  });


  // ----------- Additional Message --------------------
  // to disconnect connected app
  socket.on('connect', () => {
    logger.info(`Socket ${socket.id} has ${socket.connected} state`);
  });
  socket.on('connect_error', (error) => {
    logger.info(`Socket ${socket.id} has connect_error`);
  });
  socket.on('connect_timeout', (timeout) => {
    logger.info(`Socket ${socket.id} has connect_timeout`);
  });
  socket.on('error', (error) => {
    logger.info(`Socket ${socket.id} has error`);
  });
  socket.on('disconnect', function () {
    io.sockets.emit('app Disconnected');
    consle.log(`Socket ${socket.id} is now Disconnected`);
    logger.info(`Socket ${socket.id} is now Disconnected`);
  });
  // to connect app
  socket.on('newapp', function (name) {
    logger.info(name, ' Is Now Connected!');
    io.sockets.emit('txt', name + ' app is now online');
  });

  console.log(`Socket ${socket.id} has connected to server`);
  logger.log(`Socket ${socket.id} has connected to server`);
});


