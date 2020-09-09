import React from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';

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

		if (response.status === 200){
			window.location.href = '/Login';
		}

		return response;
}

	render() {
		return (
			<Row className="justify-content-md-center">
				<Col xs lg="3">
					<Card>
						<Card.Title className="text-center" >Register</Card.Title>
						<Card.Body>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Control type="text" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange} />
								</Form.Group>

								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Control type="text" value={this.state.emails} placeholder="Username" onChange={this.handleEmailChange} />
								</Form.Group>

								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Control type="password" value={this.state.password} placeholder="Username" onChange={this.handlePasswordChange} />
								</Form.Group>

								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Control type="password" value={this.state.repeatPassword} placeholder="Password" onChange={this.handlerepeatPasswordChange} />
								</Form.Group>
								<Button type="submit" variant="primary" size="lg" block>Register</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default Register;