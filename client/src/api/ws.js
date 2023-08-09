import { io } from "socket.io-client";
import CONSTANTS from "../constants";
import { addMessage } from "../redux/slices/messagesSlice";
import store from "../redux/store";

const {
  WS_SERVER_URL,
  SOCKET_EVENTS: {
    NEW_MESSAGE,
    NEW_MESSAGE_ERROR
  }
} = CONSTANTS;

const socket = io(WS_SERVER_URL);

export const sendMessage = (message) => {
  socket.emit(NEW_MESSAGE, message);
}

socket.on(NEW_MESSAGE, (dataFromServer) => {
  const { data: newMessage } = dataFromServer;
  store.dispatch(addMessage(newMessage));
});