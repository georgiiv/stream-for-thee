import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		});
	}
	handlePasswordChange(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleSubmit(event) {
		console.log('username:', this.state.username, 'password:', this.state.password);
		event.preventDefault();
		this.postLogin();
	}

	async postLogin() {
		const response = await fetch("/api/auth/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		});

		if(response.status === 200){
			window.location.href = '/Profile';
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
				</label>
				<label>
					Password:
					<input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Login;