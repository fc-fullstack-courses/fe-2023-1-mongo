const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { PORT } = require('./constants');
const { Message } = require('./models');

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('newMessage', async (message) => {
    // прийшло повідомлення від клєнту
    console.log(message);

    // 1. зберігаємо у БД
    const newMessage = await (await Message.create(message)).populate({ path: 'author', select: ['firstName', 'lastName'] });

    // 2. надіслати повідомлення всім клєнтам
    io.emit('newMessage', {data: newMessage});
  });

  // подія при відключенні користувачв
  socket.on('disconnect', (reason) => {
    console.log(reason);
  })
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
