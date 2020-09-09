import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
		this.getUserInfo();
	}

	getUserInfo() {
		this.source = fetch("/api/auth/").then(res => res.json())
			.then((source) => {
				if (source) {
					this.setState({
						isLoggedIn: true
					});
				}
			})
	}

	async postLogout() {
		const response = await fetch("/api/auth/logout", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 200) {
			window.location.href = '/Login';
		}
		return response;
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		// return (
		// 	<nav>
		// 		<h3>Logo</h3>
		// 		<ul className="nav-links">

		// 			<NavLink activeClassName="nav-active" className="nav-style" exact to='/'>
		// 				<li>Home</li>
		// 			</NavLink>
		// 			<NavLink activeClassName="nav-active" className="nav-style" exact to='/Streams' >
		// 				<li>Streams</li>
		// 			</NavLink>

		// 			{isLoggedIn
		// 				? [
		// 					<NavLink activeClassName="nav-active" className="nav-style" exact to='/Profile' >
		// 						<li>Profile</li>
		// 					</NavLink>,
		// 					<NavLink activeClassName="nav-active" className="nav-style" onClick={this.postLogout} exact to='/Login' >
		// 						<li>Logout</li>
		// 					</NavLink>
		// 				]
		// 				: [
		// 					<NavLink activeClassName="nav-active" className="nav-style" exact to='/Login' >
		// 						<li>Login</li>
		// 					</NavLink>,
		// 					<NavLink activeClassName="nav-active" className="nav-style" exact to='/Register' >
		// 						<li>Register</li>
		// 					</NavLink>
		// 				]
		// 			}

		// 		</ul>
		// 	</nav>
		// );

		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#">TU-Sofia</Navbar.Brand>

				<Nav className="ml-auto">

					<NavLink activeClassName="active" className="nav-link" exact to='/' >
						<li>Home</li>
					</NavLink>
					<NavLink activeClassName="active" className="nav-link" exact to='/Streams' >
						<li>Streams</li>
					</NavLink>
					{isLoggedIn
						? [
							<NavLink activeClassName="active" className="nav-link" exact to='/Profile' >
								<li>Profile</li>
							</NavLink>,
							<NavLink activeClassName="active" className="nav-link" exact to='/login' onClick={this.postLogout}>
								<li>Logout</li>
							</NavLink>
						]
						: [
							<NavLink activeClassName="active" className="nav-link" exact to='/Login' >
								<li>Login</li>
							</NavLink>,
							<NavLink activeClassName="active" className="nav-link" exact to='/Register' >
								<li>Register</li>
							</NavLink>
						]
					}

				</Nav>
				<Form inline>
					{/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-info">Search</Button> */}
				</Form>
			</Navbar>
		)
	}
}

export default Navigation;