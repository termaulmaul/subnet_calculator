"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const subnetCalculator_1 = require("./subnetCalculator");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static('public'));
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('calculate', (data) => {
        const result = (0, subnetCalculator_1.calculateSubnet)(data.ip, data.subnetMask);
        socket.emit('result', result);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
