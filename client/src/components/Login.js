import React from 'react';
import "../App.css";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {profileInfo: ""}
		this.getUserInfo();
	}

	getUserInfo() {
		this.source = fetch("/api/auth/login?username=atanas&password=1234").then(res => res.json())
		.then((source) => {
				this.setState({
					isLoaded: true,
					profileInfo: source
				});
		})
	}

	render() {		
		return (
			<div>
				<h1>Login</h1>
				<p>{JSON.stringify(this.state.profileInfo)}</p>
			</div>
		)
	}
}

export default Login;