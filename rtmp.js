const NodeMediaServer = require('node-media-server');
const Encoder = require("./services/encoder");
const db = require("./models");

const config = {
	rtmp: {
		port: 1935,
		chunk_size: 60000,
		gop_cache: true,
		ping: 30,
		ping_timeout: 60
	}
};

var nms = new NodeMediaServer(config)

const getStreamKeyFromStreamPath = (path) => {
	let parts = path.split('/');
	return parts[parts.length - 1];
};

nms.on('prePublish', (id, StreamPath, args) => {
	//console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
	
	let session = nms.getSession(id);
	let streamKey = getStreamKeyFromStreamPath(StreamPath);

	db.User.findOne({where: {streamKey: streamKey}}).then(function(user) {
		if(user){
			console.log("Starting Encoder");
			Encoder.startEncode("rtmp://localhost:55456/"+StreamPath, user);
		}else{
			console.log("Bug here. session.reject() is borked and OBS constantly tries to reconnect", "id", session.publishStreamId);
			session.sendStatusMessage(session.publishStreamId, "error", "NetStream.publish.Unauthorized", "Authorization required.");
			session.reject();
		}
	});
});

// nms.on('postPublish', (id, StreamPath, args) => {
// 	console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
// });

module.exports = nms;
