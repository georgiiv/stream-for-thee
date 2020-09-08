import React from 'react';
import ClapprPlayer from './ClapprPlayer';
import Chat from './Chat';

class Stream extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			streamUrl: "",
		}

		this.getStream();
	}

	async getStream(){
		let res = await fetch("/api/streams/" + this.props.match.params.username);
		res = await res.json();

		console.log(res);

		if( res.live ){			
			let source = res.stream;

			this.setState({
				isLoaded: true,
				streamUrl: "/streams" + source.streamPath + source.playList
			});
		}
	}

	render() {
		if(this.state.streamUrl === ""){
			return (
				<div>
					<h1>Offline</h1>
					<Chat streamer={this.props.match.params.username} />
				</div>
			)
		}
		
		return (
			<div>
				<h1>Stream</h1>
				<ClapprPlayer source={this.state.streamUrl} />
				<Chat/>
			</div>
		)
	}
}

export default Stream;