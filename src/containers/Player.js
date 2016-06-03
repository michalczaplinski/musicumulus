import React, {PropTypes, Component} from 'react';
import SC from 'soundcloud';

class Player extends Component {

  //TODO: add proptypes

  constructor(props) {
    super(props);
    this.startStreaming = this.startStreaming.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.PlayButton = this.PlayButton.bind(this);
    this.SCPlayer = {};
  }

  componentWillReceiveProps(nextProps) {
    let current = this.props.playerState.track_data;
    let next = nextProps.playerState.track_data;

    if (current != next) {
      this.startStreaming(nextProps.playerState.track_data);
    }
  }

  addSCPlayerEventListeners(SCPlayer) {
    SCPlayer.on('audio_error', (err) => { console.error('audio_error', err)});
    SCPlayer.on('geo_blocked', (err) => { console.error('geo_blocked', err)});
    SCPlayer.on('no_streams', (err) => { console.error('no_streams', err)});
    SCPlayer.on('no_protocol', (err) => { console.error('no_protocol', err)});
    SCPlayer.on('no_connection', (err) => { console.error('no_connection', err)})
  }

  startStreaming(trackData) {
    SC.stream(`/tracks/${trackData.id}`).then(SCPlayer => {
      this.SCPlayer = SCPlayer;
      this.props.streamTrack(trackData);
      this.addSCPlayerEventListeners(SCPlayer);
      SCPlayer.play();
      this.props.playTrack(trackData.id);
    })
  }

  pause() {
    if (this.props.playerState.is_streaming) {
      this.SCPlayer.pause();
      this.props.pauseTrack();
    }
  }

  play() {
    // in case we have a streaming instance of SC player, just resume current song.
    if (this.props.playerState.is_streaming) {
      this.SCPlayer.play();
      this.props.resumeTrack();

    // otherwise, stream the first song on the list.
    } else {
      this.startStreaming(this.props.tracks[0])
    }
  }

  PlayButton() {
    let handleClick = this.props.playerState.is_playing ? this.pause : this.play;
    let icon = this.props.playerState.is_playing ? 'fa fa-pause' : 'fa fa-play';
    return  <a className="player--item" onClick={handleClick}>
              <i className={icon}></i>
            </a>
  }

  render() {

    let trackData = this.props.playerState.track_data;
    let coverImageUrl = trackData.artwork_url || ((trackData.user != undefined ) ?
                                                   trackData.user.avatar_url :
                                                   'http://placehold.it/64x64');
    let username = trackData.user ? trackData.user.username : '';

    return (
      <div className="player">
        <a className="player--item">
          <img src={ coverImageUrl } alt="Track Image" height="40" width="40"/>
        </a>

        <a className="player--title">
          <strong className="player--title-item"> { username } </strong>
          <span className="player--title-item" >{ trackData.title }</span>
        </a>

        <a className="player--item">
          <i className="fa fa-step-backward"></i>
        </a>
        {this.PlayButton()}
        <a className="player--item">
          <i className="fa fa-step-forward"></i>
        </a>
        <span className="player--slider">
          <input type="range" defaultValue="0"/>
        </span>
        <a className="player--item">
          <i className="fa fa-volume-up"> </i>
        </a>
      </div>
  )}
}

export default Player;
