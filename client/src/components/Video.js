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
		let res = await fetch("/api/streams/id/" + this.props.match.params.id);
		try{
			res = await res.json();
			this.setState({
				streamUrl: "/streams" + res.streamPath + res.playList,
				streamInfo: res
			});
		}catch(e){
			console.log("Video not found");
		}
		
	}

	render() {
		if(this.state.streamUrl === ""){
			return (
				<div>
					<br></br>
					<h1 className="text-center">Video not found</h1>
				</div>
			)
		}
		
		return (
			<div class="container-fluid">
				<Row>
					<Col Col xs lg="9">						
						<ClapprPlayer source={this.state.streamUrl} />			
						<h2>Title: {this.state.streamInfo.streamName}</h2>						
						<a href={"/" + this.state.streamInfo.User.userName + "/videos"}>
							<img className="stream-profile-picture" src={"/avatars/"+this.state.streamInfo.User.profilePicture} alt={this.state.streamInfo.User.userName}/>
							{this.state.streamInfo.User.userName}
						</a>
					</Col>
					{/* <Col Col xs lg="3">
						<Chat streamer={this.props.match.params.username}/>
					</Col>				 */}
				</Row>
			</div>
		)
	}
}

export default Stream;