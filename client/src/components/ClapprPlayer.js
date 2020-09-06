import React from 'react';
import Clappr from 'clappr';
import LevelSelector from 'level-selector';
import P2PMediaLoader, {Engine} from 'p2p-media-loader-hlsjs'
import "../App.css";

class ClapprPlayer extends React.Component {
	constructor(props) {
		super(props)
		this.engine = new Engine();
		this.playerInstance = new Clappr.Player({
			autoPlay: true,
			mute: true,
			hlsjsConfig: {
				enableWorker: true,
				liveSyncDurationCount: 7,
				loader: this.engine.createLoaderClass()
			},
			plugins: [LevelSelector]
		})		
		P2PMediaLoader.initClapprPlayer(this.playerInstance);
		this.nodeRef = React.createRef()
	}

	componentDidMount() {
		this.playerInstance.attachTo(this.nodeRef.current)
		this.loadSource(this.props.source)
	}

	componentWillUnmount() {
		this.playerInstance.destroy();
		this.engine.destroy();
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