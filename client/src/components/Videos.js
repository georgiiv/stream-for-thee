import React from 'react';

class Videos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: [],
			videos: []
		}
		this.getVideos();
	}

	getVideos() {
		console.log("\n\n\n\n\n\n\n\n", "HELPPPPPPPPPPPPPPP")
		this.source = fetch("/api/users/"+this.props.match.params.username+"/videos").then(res => res.json())
		.then((source) => {
				console.log(source)
				this.setState({
					isLoaded: true,
					videos: source.Streams.reverse(),
					username: source.userName
				});
		})
	}

	render() {		
		return (
			<div>
				<br></br>
				<h1 className="text-center">Videos</h1>
				<div>
					{this.state.videos.map(video => (
						<div className = "text-center">
							<a href={"/Video/"+video.id}>
								<img className="streamThumbnail" src={"../streams"+video.streamPath+video.thumbnail} alt="Stream Thumbnail"></img>
								<p className="streamTitle">{video.streamName}</p>
							</a>
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default Videos;