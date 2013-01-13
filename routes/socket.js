/*
 * Serve content over a socket
 */

module.exports = function (socket) {
    socket.on('todo:update', function (data) {
        socket.broadcast.emit('todo:update', data);
    });
};
