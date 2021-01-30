const socket = require("socket.io");

module.exports = function(server) {
  const io = socket(server);
  io.sockets.on("connection", newConnection);

  function newConnection(socket) {
    console.log("new connection: ", socket.id);

    socket.on("send-msg", data => {
      console.log(`USER ${data.userID} >>> sent-msg`);
      socket.broadcast.emit(`${data.bookID}-sent-msg`, data);
    });
  }
};
