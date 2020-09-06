import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import Streams from './components/Streams';
import Login from './components/Streams';
import Stream from './components/Stream';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Nav />
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/About" component={About}/>
						<Route path="/Streams" component={Streams}/>
						<Route path="/Login" component={Login}/>
						<Route path='/:username' component={Stream} />
					</Switch>					
				</div>
			</Router>
		);
	}
}

export default App;
