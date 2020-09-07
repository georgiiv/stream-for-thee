import React from 'react';
import "../App.css";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			repeatPassword: ''
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlerepeatPasswordChange = this.handlerepeatPasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		});
	}
	handleEmailChange(event) {
		this.setState({
			email: event.target.value
		});
	}
	handlePasswordChange(event) {
		this.setState({
			password: event.target.value
		});
	}
	handlerepeatPasswordChange(event) {
		this.setState({
			repeatPassword: event.target.value
		});
	}

	handleSubmit(event) {
		console.log('username:', this.state.username, 'email:', this.state.email, 'password:', this.state.password, 'repeatPassword:', this.state.repeatPassword);
		event.preventDefault();
		this.postRegister();
	}

	async postRegister() {
		const response = await fetch("/api/auth/register", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
				repeatPassword: this.state.repeatPassword
			})
		});
		console.log(await response);
		return response;
}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
						<input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
				</label>
				<label>
					Email:
						<input type="email" value={this.state.emails} onChange={this.handleEmailChange} />
				</label>
				<label>
					Password:
						<input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
				</label>
				<label>
					Repeat Password:
						<input type="password" value={this.state.repeatPassword} onChange={this.handlerepeatPasswordChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Register;