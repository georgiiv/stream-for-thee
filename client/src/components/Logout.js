import React from 'react';

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
		const response = await fetch("/api/auth/login", {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if(response.status === 200){
			window.location.href = '/Login';
		}
		return response;
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="submit" value="Backup logout button" />
			</form>
		);
	}
}

export default Login;