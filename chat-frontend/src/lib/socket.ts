import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000'); // Replace with your backend URL
  }
  return socket;
};

export const getSocket = () => socket;
