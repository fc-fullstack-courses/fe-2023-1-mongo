// ngrok-skip-browser-warning
const SERVER_URL = 'localhost:9999';

const CONSTANTS = {
  HTTP_BASE_URL: `http://${SERVER_URL}`,
  WS_SERVER_URL: `ws://${SERVER_URL}`,
  TOKEN_STRING: 'token',
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'newMessage',
    NEW_MESSAGE_ERROR: 'newMessageError'
  }
}

export default CONSTANTS;