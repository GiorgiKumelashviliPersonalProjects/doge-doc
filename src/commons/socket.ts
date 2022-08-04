import {io, Socket} from 'socket.io-client';
import {consts} from "./consts";

let socketInstance: Socket | null = null;

export default function getSocketInstance() {
  const uuid = 'asdasdsadasdasds';

  if (socketInstance == null) {
    socketInstance = io(consts.backendApiUrlRoot, {
      transports: ['websocket'],
      timeout: 60000,
      auth: cb => cb({uuid}),
    });
  }

  return socketInstance;
}

