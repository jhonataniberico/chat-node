module.exports = (io) => {
  io.on('connection', (socket) => {
    let client = {};
    socket.on('new-participant', (objUser) => {
      objUser.visitDate = new Date();
      global.participants.push(objUser);
      client = { ...objUser, socket};

      // broadcast new user notification
      socket.broadcast.emit('new-participant', client.name);

    });
    socket.on('chat-message', (data) => {
      socket.broadcast.emit('chat-message', data);
    });
    socket.on('typing', (objUser) =>  {
      socket.broadcast.emit('typing', objUser);
    });
    socket.on('stoppedTyping', (objUser) =>  {
      socket.broadcast.emit('stoppedTyping', objUser);
    });
    socket.on('removeTyping', (objUser) =>  {
      socket.broadcast.emit('removeTyping', objUser);
    });
    socket.on('disconnect', () => {
      if (client.name == undefined) {
        // do nothing, client disconnected before joining chat
      } else {
        console.log(new Date() + ' ' + client.name + ' disconnected');
        // remove from global.participants list
        global.participants.splice((Array.from(global.participants, f => f.name)).indexOf(client.name), 1);
        // broadcast to other global.participants
        socket.broadcast.emit('disconnected', client.name);
      }
    });
  });
}