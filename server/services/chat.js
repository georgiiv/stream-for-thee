const SocketIO = require('socket.io');
const db = require("../models");

class Chat {
	static io;

	static init(server) {
		this.io = SocketIO(server);
		this.createEvents();
	}

	static sendToRoom(room, message){
		room = room.toLowerCase();
		this.io.to(room).emit('chat-message', message);
	}

	static createEvents() {
		this.io.on('connection', socket => {

			socket.on('join-room', (room) => {
				socket.join(room.toLowerCase());
				this.sendToRoom("ATANAS", "Atanas room entered");
			})

			socket.on('disconnect', () => {
				console.log("disconnect event");
				socket.leave("atanas")
			})
		})		
	}

}

module.exports = Chat;