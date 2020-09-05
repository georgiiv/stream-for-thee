const ffmpeg = require("fluent-ffmpeg");
const fs = require('fs');
const util = require('util');

const db = require("../models");

const mkdir = util.promisify(fs.mkdir);
const ffprobe = util.promisify(ffmpeg.ffprobe);

class Encoder {
	static #liveStreams=[];

	static async getResolution(source){
		let data = await ffprobe(source);
		return {
			width: data.streams[2].coded_width,
			height: data.streams[2].coded_height
		}
	}

	static async startRemux(source, user) {
		var command = ffmpeg(source)
			.on('end', function () {
				console.log('Remux finished !');
			})
			.outputOptions([
				'-c:v copy',
				'-c:a copy',
				'-f hls',
				'-hls_time 6'
			]);

		await mkdir(destinationFolder);
		command.save(destinationFolder + "stream.m3u8");
	}

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
				//console.log("Before pop", this.#liveStreams);
				this.#liveStreams.pop(stream.id);
				//console.log("After pop", this.#liveStreams);
			})
			.on('error', function(err, stdout, stderr){
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
				'-hls_segment_filename stream_%v/data%06d.ts'
			]).outputOption('-var_stream_map', 'v:0,a:0 v:1,a:1');		
		command.save('stream_%v.m3u8');

		//process.chdir("../../../");
		//console.log(process.cwd())
	}

	static getStreams() { return this.#liveStreams }
}

module.exports = Encoder;