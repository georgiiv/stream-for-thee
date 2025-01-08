import React from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			warning: ''
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
		}else{
			const warningMessage = await response.text();
			this.setState({ warning: warningMessage });
		}
	}

	render() {
		return (
			<Row className="justify-content-md-center">
				<Col xs lg="3">
					<Card>
						<Card.Title className="text-center"><h1>Login</h1></Card.Title>
						<Card.Body>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Control type="text" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange} required/>
								</Form.Group>

								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Control type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} required/>
								</Form.Group>
								<Button type="submit" variant="primary" size="lg" block>Login</Button>
							</Form>
							<br></br>
							{this.state.warning && (
								<div className="alert alert-warning" role="alert">
									{this.state.warning}
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default Login;