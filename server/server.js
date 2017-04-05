var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {

    console.log('user connected ');

    socket.on('disconnect', function () {
        console.log('user disconnected ..');
    });

    socket.on('add-message', function (message , username) {
        io.emit('message', { type: 'new-message', text: message , username: username });
    });

});

http.listen(8000, function () {
    console.log('server runnig on port 8000');
});