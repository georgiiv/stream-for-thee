import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
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
		if(response.status === 200){
			window.location.href = '/Login';
		}
		return response;
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<nav>
				<h3>Logo</h3>
				<ul className="nav-links">

					<NavLink activeClassName="nav-active" className="nav-style" exact to='/'>
						<li>Home</li>
					</NavLink>
					<NavLink activeClassName="nav-active" className="nav-style" exact to='/Streams' >
						<li>Streams</li>
					</NavLink>

					{isLoggedIn
						? [
							<NavLink activeClassName="nav-active" className="nav-style" exact to='/Profile' >
								<li>Profile</li>
							</NavLink>,
							<NavLink activeClassName="nav-active" className="nav-style" onClick={this.postLogout} exact to='/Login' >
								<li>Logout</li>
							</NavLink>
						]
						: [
							<NavLink activeClassName="nav-active" className="nav-style" exact to='/Login' >
								<li>Login</li>
							</NavLink>,
							<NavLink activeClassName="nav-active" className="nav-style" exact to='/Register' >
								<li>Register</li>
							</NavLink>
						]
					}

				</ul>
			</nav>
		);
	}
}

export default Nav;