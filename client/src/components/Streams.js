import React from 'react';

class Streams extends React.Component {
	constructor(props) {
		super(props);
		this.state = {streams: []}
		this.getStreams();
	}

	getStreams() {
		this.source = fetch("/api/streams/").then(res => res.json())
		.then((source) => {
				this.setState({
					isLoaded: true,
					streams: source
				});
		})
	}

	render() {		
		return (
			<div>
				<br></br>
				{this.state.streams.length === 0 && (
					<h1 className="text-center">No active live streams</h1>
				)}
				{this.state.streams.length > 0 && (
					<h1 className="text-center">Current live streams</h1>
				)}
				<div>
					{this.state.streams.map(stream => (
						<div className = "text-center">
							<a href={"/"+stream.User.userName}>
								<img className="streamThumbnail" src={"streams"+stream.streamPath+stream.thumbnail} alt="Stream Thumbnail"></img>
								<p className="streamTitle">{stream.streamName}</p>
								<p className="streamerName">{stream.User.userName}</p>
							</a>
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default Streams;