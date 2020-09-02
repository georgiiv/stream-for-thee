const ffmpeg = require("fluent-ffmpeg");
const fs = require('fs');
const util = require('util');

const mkdir = util.promisify(fs.mkdir);
const ffprobe = util.promisify(ffmpeg.ffprobe);

class Encoder {
	static #streams;

	static async getResolution(source){
		let data = await ffprobe(source);
		return {
			width: data.streams[2].coded_width,
			height: data.streams[2].coded_height
		}
	}

	// static getResolution(source) {
	// 	return new Promise((resolve, reject) => {
	// 		return ffmpeg.ffprobe(source, (error, videoInfo) => {
	// 			if (error) {
	// 				return reject(error);
	// 			}

	// 			let width = videoInfo.streams[2].coded_width;
	// 			let height = videoInfo.streams[2].coded_height;

	// 			return resolve({
	// 				width,
	// 				height
	// 			});
	// 		});
	// 	});
	// }

	static async startRemux(source, destinationFolder) {
		var command = ffmpeg(source)
			.on('end', function () {
				console.log('Processing finished !');
			})
			.outputOptions([
				'-f hls',
				'-hls_time 6'
			]);

		await mkdir(destinationFolder);
		command.save(destinationFolder + "stream.m3u8");
	}

	// ffmpeg -i rtmp://localhost/live/1234 \
	// -c:v copy \
	// -c:a copy \
	// -f hls -hls_time 6 stream.m3u8

	static async startEncode(source, destinationFolder) {

		var command = ffmpeg(source)
			.on('end', function () {
				console.log('Processing finished !');
			})
			.outputOptions([
				'-f hls',
				'-hls_time 6'
			]);

		console.log(await this.getResolution(source));
		console.log("plsssssss", await this.getRes(source));

		// command.clone()
		// 	.size('640x400')
		// 	.save('./public/streams/stream.mp4');
		//await mkdir(destinationFolder);
		//command.save(destinationFolder + "stream.m3u8");
	}

	getStreams() { return this.streams }
}

module.exports = Encoder;