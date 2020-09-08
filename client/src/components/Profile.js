import React from 'react';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { profileInfo: {} }
		this.getUserInfo();
	}

	async getUserInfo() {
		let source = await fetch("/api/auth/")

		if (source.status === 401) {
			window.location.href = '/Login';
		}

		source = await source.json();

		this.setState({
			profileInfo: source
		});
	}

	render() {
		return (
			<div>
				<h1>Profile</h1>
				<table>
					<tbody>
					<tr>
						<th scope="row">id</th>
							<td>{this.state.profileInfo.id}</td>
						</tr>
						<tr>
							<th scope="row">Username</th>
							<td>{this.state.profileInfo.userName}</td>
						</tr>
						<tr>
							<th scope="row">Email</th>
							<td>{this.state.profileInfo.email}</td>
						</tr>
						<tr>
							<th scope="row">Profile picture</th>
							<td>{this.state.profileInfo.profilePicture}</td>
						</tr>
						<tr>
							<th scope="row">StreamKey</th>
							<td>{this.state.profileInfo.streamKey}</td>
						</tr>
						<tr>
							<th scope="row">Date Created</th>
							<td>{this.state.profileInfo.createdAt}</td>
						</tr>
						<tr>
							<th scope="row">Date Updated</th>
							<td>{this.state.profileInfo.updatedAt}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Profile;