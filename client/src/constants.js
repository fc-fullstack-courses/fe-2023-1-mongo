// ngrok-skip-browser-warning
const SERVER_URL = 'd0db-5-180-128-9.ngrok-free.app';

const CONSTANTS = {
  HTTP_BASE_URL: `https://${SERVER_URL}`,
  WS_SERVER_URL: `wss://${SERVER_URL}`,
  TOKEN_STRING: 'token',
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'newMessage',
    NEW_MESSAGE_ERROR: 'newMessageError'
  }
}

export default CONSTANTS;