import React from 'react';
import ClapprPlayer from './ClapprPlayer';
import Chat from './Chat';
import { Row, Col } from 'react-bootstrap';

class Stream extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			streamUrl: "",
			streamInfo: {}
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
				streamUrl: "/streams" + source.streamPath + source.playList,
				streamInfo: source
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
			<div class="container-fluid">
				<Row>
					<Col Col xs lg="9">						
						<ClapprPlayer source={this.state.streamUrl} />			
						<h2>Title: {this.state.streamInfo.streamName}</h2>						
						<img className="stream-profile-picture" src={"/avatars/"+this.state.streamInfo.User.profilePicture} alt={this.state.streamInfo.User.userName}/>
						<a href="#">{this.state.streamInfo.User.userName}</a>
					</Col>
					<Col Col xs lg="3">
						<Chat streamer={this.props.match.params.username}/>
					</Col>				
				</Row>
			</div>
		)
	}
}

export default Stream;