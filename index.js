const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('views'));

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    socket.on("message", (data) => {
        socket.broadcast.emit('message', data);
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
