'use client';

import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'https://schoology-flashcards.fly.dev' : 'http://localhost';

export const socket = io(URL, {
  autoConnect: true,
  // path: '/sio/socket.io',
});