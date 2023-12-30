module.exports.chatSockets = function(ChatServer){
    let io = require('socket.io')(ChatServer);
    console.log('test io');
    io.sockets.on('connection', function(socket){
        console.log("connection recieved :", socket.id);
        socket.on('join_room', function(data){
            console.log("Join Request Recieved", data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user-joined', data);
        })
        socket.on('send-Message', function(data){
            console.log(data)
            io.in(data.chatroom).emit('recieve-Message', data);
        })
    })
}