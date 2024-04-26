import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL as string, {
  query: { uuid: window.location.hash.slice(1) },
});

export { socket };
