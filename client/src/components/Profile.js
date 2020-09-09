import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';

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
				<Row className="justify-content-md-center">
					<Col xs lg="4">
						<h1 className="text-center">{this.state.profileInfo.userName + "'s Profile"}</h1>
						<Table>
							<tbody>
								<tr>
									<th scope="row">Profile picture</th>
									<td>
										<img className="stream-profile-picture" src={"/avatars/"+this.state.profileInfo.profilePicture}></img>
									</td>
								</tr>
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
						</Table>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Profile;