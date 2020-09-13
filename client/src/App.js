import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Streams from './components/Streams';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Stream from './components/Stream';
import Profile from './components/Profile';
import Videos from './components/Videos';
import Video from './components/Video';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navigation />
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/Streams" component={Streams}/>
						<Route path="/Login" component={Login}/>
						<Route path="/Logout" component={Logout}/>
						<Route path="/Register" component={Register}/>
						<Route path="/Profile" component={Profile}/>
						<Route path='/Video/:id' component={Video} />
						<Route path='/:username/Videos' component={Videos} />
						<Route path='/:username' component={Stream} />
					</Switch>					
				</div>
			</Router>
		);
	}
}

export default App;
