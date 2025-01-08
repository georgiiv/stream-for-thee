## Stream For Thee
A simple live streaming service implementation, which also utilizes P2P sharing between clients to lighten server bandwidth load.

#### Developed with Express.js, React, Bootstrap, WebSockets, RTMP and FFMPEG

## How to run

#### Requrements
- Node.JS
- PostgreSQL
- FFMPEG available on the system path
- OBS Studio

#### Server
- Go to `./server`
- Run `npm install`
- Run `node app.js`

#### Client
- Go to `./client`
- run `npm install`
- If executing on `windows` run
`$env:NODE_OPTIONS = "--openssl-legacy-provider"`
- I*f executing on `linux` run
`set NODE_OPTIONS=--openssl-legacy-provider`
- Run `npm start`

## How to use
- Website will be accessible from `http://localhost:3000/`
- Create an account from `http://localhost:3000/Register`
- Login from `http://localhost:3000/Login`
- OBS is needed to start a stream
  - Inside OBS go to `Settings/Stream`
	- Set Server to `http://localhost:5678`
	- Set Stream Key to the one available from `http://localhost:3000/Profile`
- All current live streams are available on `http://localhost:3000/Streams`
- Current stream and live chat of a user can found on `http://localhost:3000/{username}`
  - live chat is available, even if the stream is offline.
- Past streams of a user can be found on `http://localhost:3000/{username}/videos`
