import React from 'react';
import Clappr from 'clappr';
import LevelSelector from 'level-selector';
import "../App.css";

class ClapprPlayer extends React.Component {
	constructor(props) {
		super(props)
		this.playerInstance = new Clappr.Player({
			autoPlay: true,
			mute: true,
			// chromeless:true,
			hlsjsConfig: {
				enableWorker: true
			},
			plugins: [LevelSelector]
		})
		this.nodeRef = React.createRef()
	}

	componentDidMount() {
		this.playerInstance.attachTo(this.nodeRef.current)
		this.loadSource(this.props.source)
	}

	componentWillUnmount() {
		this.playerInstance.destroy()
	}

	shouldComponentUpdate(nextProps, _) {
		if (nextProps.source !== this.props.source) {
			this.loadSource(nextProps.source)
		}
		return false
	}

	loadSource(src) {
		this.playerInstance.load(src)
	}

	render() {
		return <div ref={this.nodeRef} class='player-wrapper' />
	}
}

export default ClapprPlayer;