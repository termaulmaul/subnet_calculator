// src/index.ts

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { calculateSubnet } from './subnetCalculator';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('calculate', (data) => {
    const result = calculateSubnet(data.ip, data.subnetMask);
    socket.emit('result', result);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
