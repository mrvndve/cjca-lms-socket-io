const express = require('express');

const app = express();

const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.write(`<h1>Socket IO start on port: ${PORT}</h1>`);
  res.end();
});

const io = new Server({
  cors: {
    origin: ['https://cjca-lms.online', 'http://cjca-lms-online.preview-domain.com/'],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected!");

  socket.on("sendNotifications", data => {
    socket.broadcast.emit("receiveNotifications", data);
  });

  socket.on("sendNotifications2", data => {
    socket.broadcast.emit("receiveNotifications2", data);
  })

  socket.on("disconnected", () => {
    console.log("Socket disconnected");
  });
});

io.listen(PORT);