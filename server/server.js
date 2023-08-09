const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { PORT } = require('./constants');
const { Message } = require('./models');
const CONSTANTS = require('./constants');
const { SOCKET_EVENTS: { NEW_MESSAGE, NEW_MESSAGE_ERROR } } = CONSTANTS;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on(NEW_MESSAGE, async (message) => {
    // прийшло повідомлення від клєнту
    console.log(message);

    // 1. зберігаємо у БД
    const newMessage = await (await Message.create(message)).populate({ path: 'author', select: ['firstName', 'lastName'] });

    // 2. надіслати повідомлення всім клєнтам
    io.emit(NEW_MESSAGE, { data: newMessage });
  });

  // подія при відключенні користувачв
  socket.on('disconnect', (reason) => {
    console.log(reason);
  })
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
