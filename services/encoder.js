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
		await mkdir(destinationFolder);
		process.chdir(destinationFolder);

		var command = ffmpeg(source)
			.on('end', function () {
				console.log('Processing finished !');
			})
			.addOption('-filter_complex', '[v:0]split=2[vtemp001][vout002];[vtemp001]scale=w=960:h=540[vout001]')
			.outputOptions([
				'-preset veryfast',
				'-g 25',
				'-sc_threshold 0',
				'-map [vout001]',
				'-c:v:0 libx264',
				'-b:v:0 2000k',
				'-map [vout002]',
				'-c:v:1 libx264',
				'-b:v:1 6000k',
				'-map a:0',
				'-map a:0',
				'-c:a aac',
				'-b:a 128k',
				'-ac 2',
				'-f hls',
				'-hls_time 4',
				'-hls_playlist_type event',
				'-hls_flags',
				'independent_segments',
				'-master_pl_name master.m3u8',
				'-hls_segment_filename stream_%v/data%06d.ts',
				'-use_localtime_mkdir 1'
			]).outputOption('-var_stream_map', 'v:0,a:0 v:1,a:1')
		
		command.save('stream_%v.m3u8');
	}

	getStreams() { return this.streams }
}

module.exports = Encoder;