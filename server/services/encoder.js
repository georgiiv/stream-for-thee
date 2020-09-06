const ffmpeg = require("fluent-ffmpeg");
const fs = require('fs');
const util = require('util');

const db = require("../models");

const mkdir = util.promisify(fs.mkdir);
const ffprobe = util.promisify(ffmpeg.ffprobe);

class Encoder {
	static #liveStreams = [];

	static getStreams() { return this.#liveStreams }

	static async getResolution(source) {
		let data = await ffprobe(source);
		return {
			width: data.streams[2].coded_width,
			height: data.streams[2].coded_height
		}
	}

	static async generateThumbnail(source, destinationFolder) {
		var command = ffmpeg(source)
			.addOption('-vframes 1')
			.save(destinationFolder + "thumbnail.png");
	}

	// static async startRemux(source, user) {
	// 	var command = ffmpeg(source)
	// 		.on('end', function () {
	// 			console.log('Remux finished !');
	// 		})
	// 		.outputOptions([
	// 			'-c:v copy',
	// 			'-c:a copy',
	// 			'-f hls',
	// 			'-hls_time 6'
	// 		]);

	// 	await mkdir(destinationFolder);
	// 	command.save(destinationFolder + "stream.m3u8");
	// }

	static async startEncode(source, user) {
		let stream = await db.Stream.createStream(user);
		let destinationFolder = "./public/streams/" + stream.streamPath;

		await mkdir(destinationFolder);
		process.chdir(destinationFolder);

		var command = ffmpeg(source)
			.on('start', (ffmpegCommand) => {
				process.chdir("../../../");
				console.log(ffmpegCommand)
				this.#liveStreams.push(stream.id);
			})
			.on('end', () => {
				console.log('Reencode finished !');
				this.#liveStreams.pop(stream.id);
			})
			.on('error', function (err, stdout, stderr) {
				console.log('Cannot process video: ' + err.message);
			})
			.addOption('-filter_complex', '[v:0]split=3[vtemp001][vout002][vout003];[vtemp001]scale=w=960:h=540[vout001]')
			.outputOptions([
				'-preset veryfast',
				'-g 25',
				'-sc_threshold 0',
				'-map [vout003]', '-vframes 1', 'thumbnail.png',
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
				'-strftime_mkdir 1',
				'-master_pl_name master.m3u8',
				'-hls_segment_filename stream_%v/data%06d.ts',
			]).outputOption('-var_stream_map', 'v:0,a:0 v:1,a:1')
		command.save('stream_%v.m3u8');

	}


	// This is what happens when shit doesn't want to work... Have fun understanding what is going on here future me.
	// In the normal way the thumbnail is generated after the stream ends. I need it now!
	// If i try to make the thumbnail with a separate function during encoding, the re-encoding stops
	// this is why i first generate the thumbnail and on the "end" even i start the re-encoding
	// connect to stream -> generate thumbnail -> disconnect from stream -> connect to stream -> start re-encoding

	static async smellyEncoder(source, user){
		let stream = await db.Stream.createStream(user);
		let destinationFolder = "./public/streams/" + stream.streamPath;

		await mkdir(destinationFolder);
		process.chdir(destinationFolder);

		var thumb = ffmpeg(source)
		.outputOption('-vframes 1')			
		.on('end', () => {
			var command = ffmpeg(source)
				.on('start', (ffmpegCommand) => {
					process.chdir("../../../");
					console.log(ffmpegCommand)
					this.#liveStreams.push(stream.id);
				})
				.on('end', () => {
					console.log('Reencode finished !');
					this.#liveStreams.pop(stream.id);
				})
				.on('error', function (err, stdout, stderr) {
					console.log('Cannot process video: ' + err.message);
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
					'-strftime_mkdir 1',
					'-master_pl_name master.m3u8',
					'-hls_segment_filename stream_%v/data%06d.ts',
				]).outputOption('-var_stream_map', 'v:0,a:0 v:1,a:1')
			command.save('stream_%v.m3u8');			
		})
		thumb.save('thumbnail.png');
	}

}

module.exports = Encoder;