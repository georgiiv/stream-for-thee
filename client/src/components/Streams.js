import React, {useState, useEffect} from 'react';
import "../App.css";

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
				<h1>Streams</h1>
				<div>
					{this.state.streams.map(stream => (
						<div>
							<a href={"/"+stream.User.userName}>
								<img src={"streams"+stream.streamPath+stream.thumbnail}></img>
								<p>{stream.streamName}</p>
								<p>{stream.User.userName}</p>
							</a>
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default Streams;