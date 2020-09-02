const NodeMediaServer = require('node-media-server');
const Encoder = require("./services/encoder");

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
	console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

	let session = nms.getSession(id);
	let stream_key = getStreamKeyFromStreamPath(StreamPath);

	//Encoder.startEncode("rtmp://localhost/"+StreamPath, "./public/streams/pesho/");

	//console.log(stream_key);
	//console.log("rtmp://localhost/"+StreamPath);
	if (stream_key != "1234") {
		session.reject();
	}
});

nms.on('postPublish', (id, StreamPath, args) => {
	console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

module.exports = nms;
