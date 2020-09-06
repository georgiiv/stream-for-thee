import React from 'react';
import "../App.css";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {profileInfo: ""}
		this.getUserInfo();
	}

	getUserInfo() {
		this.source = fetch("/api/auth/").then(res => res.json())
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
				<h1>Profile</h1>
				<p>{JSON.stringify(this.state.profileInfo)}</p>
			</div>
		)
	}
}

export default Profile;