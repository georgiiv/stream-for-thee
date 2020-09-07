import React from 'react';
import io from 'socket.io-client';
import "../App.css";

const SOCKET_ENDPOINT = '/';

class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			response: "Loading",
			message: "",
		};

		this.socket = io(SOCKET_ENDPOINT)

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.socket.emit('join-room', "atanas");

		this.socket.on('room-entered', (data) => {
			this.setState({
				response: data
			})
		})

		this.socket.on('chat-message', (data) => {
			this.setState({
				response: data
			})
		})
	}	

	componentWillUnmount() {
		this.socket.close()
	}

	handleInputChange(event) {
		this.setState({
			message: event.target.value
		});
	}	

	handleSubmit(event) {
		event.preventDefault();		
		this.postMessage();
	}

	async postMessage(){
		const response = await fetch("/api/chat/atanas", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: this.state.message
			})
		});
		console.log(await response);
		return response;
	}

	render() {
		const { response } = this.state;
		return (
			<div>
				<div>{response}</div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Message:
						<input type="text" value={this.state.message} onChange={this.handleInputChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Chat;