import React from 'react';
import io from 'socket.io-client';

const SOCKET_ENDPOINT = '/';

class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			message: "",
			chat: []
		};

		this.socket = io(SOCKET_ENDPOINT)

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getUserInfo();
	}

	componentDidMount() {
		console.log(this.props.streamer);
		this.socket.emit('join-room', this.props.streamer);

		this.socket.on('room-entered', (data) => {
			this.setState({
				response: data
			})
		})

		this.socket.on('chat-message', (sender, message) => {
			this.setState({
				chat: this.state.chat.concat({ sender: sender, content: message })
			})
		})
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
		this.socket.close()
	}

	getUserInfo() {
		this.source = fetch("/api/auth/").then(res => res.json())
			.then((source) => {
				if (source) {
					this.setState({
						isLoggedIn: true
					});
				}
			})
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

	async postMessage() {
		const response = await fetch("/api/chat/" + this.props.streamer, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: this.state.message
			})
		});

		this.setState({
			message: ""
		})

		return response;
	}

	render() {
		let isLoggedIn = this.state.isLoggedIn;
		return (
			<div>

				<div className="chat-style">
					{this.state.chat.map(message => (
						<p>{message.sender + ": " + message.content}</p>
					))}
				</div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Message:
						<input type="text" value={this.state.message} onChange={this.handleInputChange} />
					</label>
					{isLoggedIn
						? [
							<input type="submit" value="Send" />
						]
						: [
							<input type="submit" value="Send" disabled />
						]
					}

					<h1>{}</h1>
				</form>
			</div>
		);
	}
}

export default Chat;