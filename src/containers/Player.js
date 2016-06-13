import React, {PropTypes, Component} from 'react';
import SC from 'soundcloud';

import {trackTime} from '../helpers/helpers';
import PlayerPlayButton from '../components/PlayerPlayButton';
import PlayerVolume from '../components/PlayerVolume';


// SCPlayer is a global as it is used all over the place and we cannot put in component
// state or the store because it keeps track of it own state and would result in multiple
// unnecessary rerenders.
export var SCPlayer = {};


class Player extends Component {

  //TODO: add proptypes

  constructor(props) {
    super(props);
    this.startStreaming = this.startStreaming.bind(this);
    this.playNextTrack = this.playNextTrack.bind(this);
    this.playPreviousTrack = this.playPreviousTrack.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
    this.handleTrackPositionUpdate = this.handleTrackPositionUpdate.bind(this);
  }

  addSCPlayerEventListeners() {

    // handle potential errors
    SCPlayer.on('audio_error', (err) => { console.error('audio_error', err)});
    SCPlayer.on('geo_blocked', (err) => { console.error('geo_blocked', err)});
    SCPlayer.on('no_streams', (err) => { console.error('no_streams', err)});
    SCPlayer.on('no_protocol', (err) => { console.error('no_protocol', err)});
    SCPlayer.on('no_connection', (err) => { console.error('no_connection', err)});

    SCPlayer.on('finished', () => { this.props.updateTrackPosition(0) })
  }

  startStreaming(trackData) {
    SC.stream(`/tracks/${trackData.id}`).then(player => {

      // SCPlayer is a global;
      SCPlayer = player;
      this.props.streamTrack(trackData);
      this.addSCPlayerEventListeners();
      SCPlayer.play();
      this.props.playTrack(trackData.id);
    })
  }

  playNextTrack() {
    let currentIndex = this.props.tracks.findIndex((track, index, array) => {
      return track.id == this.props.playerState.track_data.id;
    });

    // TODO In case the current track is the last in the array, fetch more.
    this.startStreaming(this.props.tracks[currentIndex+1]);
  }

  playPreviousTrack() {
    let currentIndex = this.props.tracks.findIndex((track, index, array) => {
      return track.id == this.props.playerState.track_data.id;
    });

    if (currentIndex == 0) {
      return;
      // TODO perhaps show a notification;
    }

    this.startStreaming(this.props.tracks[currentIndex-1]);
  }

  updateTrackPosition() {
    this.props.updateTrackPosition(parseInt(SCPlayer.currentTime()));
  }

  handleTrackPositionUpdate(event) {
    let newPosition = event.target.value;
    SCPlayer.seek(newPosition);
    this.props.updateTrackPosition(parseInt(newPosition));
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.playerState.is_playing) { this.updateTrackPosition(); }
    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    let currentTrack = this.props.playerState.track_data;
    let nextTrack = nextProps.playerState.track_data;

    if (currentTrack != nextTrack) {
      this.startStreaming(nextProps.playerState.track_data);
      this.props.updateTrackPosition(0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    let trackData = this.props.playerState.track_data;
    let coverImageUrl = trackData.artwork_url || ((trackData.user != undefined ) ?
                                                   trackData.user.avatar_url :
                                                   'https://placehold.it/64x64');
    let username = trackData.user ? trackData.user.username : '';

    let playerVisibility = this.props.playerState.is_streaming ? 'visible' : 'hidden';

    let playerClass = `player ${playerVisibility}`;

    return (
      <div className={playerClass}>
        <a className="player--cover">
          <img src={ coverImageUrl } alt="Track Image" height="40" width="40"/>
        </a>

        <a className="player--title">
          <strong className="player--title-item"> { username } </strong>
          <span className="player--title-item" >{ trackData.title }</span>
        </a>

        <span className="player--timeElapsed" >
          {trackTime(this.props.playerState.track_position)}
        </span>

        <a className="player--button" onClick={this.playPreviousTrack}>
          <i className="fa fa-step-backward"></i>
        </a>

        <PlayerPlayButton tracks={this.props.track_data}
                          is_streaming={this.props.playerState.is_streaming}
                          is_playing={this.props.playerState.is_playing}
                          startStreaming={this.props.startStreaming}
                          pauseTrack={this.props.pauseTrack}
                          resumeTrack={this.props.resumeTrack} />

        <a className="player--button" onClick={this.playNextTrack}>
          <i className="fa fa-step-forward"></i>
        </a>

        <span className="player--slider">
          <input type="range" min="0"
                 max={this.props.playerState.track_data.duration}
                 value={this.props.playerState.track_position}
                 onChange={this.handleTrackPositionUpdate}
                 />
        </span>
        <PlayerVolume currentVolume={this.props.playerState.volume}
                      previousVolume={this.props.playerState.previous_volume}
                      changeVolume={this.props.changeVolume}
        />
      </div>
  )}
}

export default Player;
