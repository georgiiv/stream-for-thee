import React from 'react';
import "../App.css";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.postLogout();
	}

	async postLogout() {
		const response = await fetch("/api/auth/logout", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(await response);
		return response;
}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Login;