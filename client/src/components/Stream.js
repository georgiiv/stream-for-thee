import React from 'react';
import ClapprPlayer from './ClapprPlayer';
import "../App.css";

class Stream extends React.Component {
	constructor(props) {
		super(props);
		this.state = {streamUrl: ""}
		this.getStream();
	}

	getStream() {
		this.source = fetch("/api/streams/" + this.props.match.params.username).then(res => res.json())
		.then((source) => {
				this.setState({
					isLoaded: true,
					streamUrl: "/streams" + source.streamPath + source.playList
				});
		})
	}

	render() {
		if(this.state.streamUrl === ""){
			return (
				<div>
					<h1>Offline bepce</h1>
				</div>
			)
		}
		
		return (
			<div>
				<h1>Stream</h1>
				<ClapprPlayer source={this.state.streamUrl} />
			</div>
		)
	}
}

export default Stream;