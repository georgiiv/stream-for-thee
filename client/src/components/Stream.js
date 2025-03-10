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
					<br></br>
					<center><h1>{this.props.match.params.username} offline chat.</h1></center>
					<Chat streamer={this.props.match.params.username} />
				</div>
			)
		}
		
		return (
			<div className="container-fluid">
				<br></br>
				<Row>
					<Col Col xs lg="9">						
						<ClapprPlayer source={this.state.streamUrl} />			
						<h2>Title: {this.state.streamInfo.streamName}</h2>						
						<a href={"/" + this.state.streamInfo.User.userName + "/videos"}>
							<img className="stream-profile-picture" src={"/avatars/"+this.state.streamInfo.User.profilePicture} alt={this.state.streamInfo.User.userName}/>
							{this.state.streamInfo.User.userName}
						</a>
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