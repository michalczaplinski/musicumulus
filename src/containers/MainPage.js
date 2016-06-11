import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Waypoint from 'react-waypoint';
import SC from 'soundcloud';

import * as actions from '../actions/actions';
import Track from '../components/Track';
import TopBar from '../components/TopBar';
import Spinner from '../components/Spinner';
import Player from './Player';
import {httpsify} from '../helpers/helpers';


export class MainPage extends Component {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.makeContent = this.makeContent.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(path) {
    if (!this.props.appState.is_connected) {
      this.props.actions.fetchInitialData();
    } else {
      this.props.actions.fetchUserData(path || this.props.location.pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    let current = this.props.appState.is_connected;
    let next = nextProps.appState.is_connected;

    // if the component loses the connection, fetch the initial data again.
    if (current != next && next == false) {
      this.props.actions.fetchInitialData();
    }

    // todo: need to change this for checking for data's presence + caching.
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.fetchData(nextProps.location.pathname);
    }
  }

  makeContent() {
    let data = this.props.userData.tracks || [];
    return (
      <div>
        <div className="my-container">
          {data.map(track => <Track key={track.id + track.user_id + Math.floor(Math.random()*1000000000)}
                                    trackData={track}
                                    streamTrack={this.props.actions.streamTrack}/>)}
        </div>
      </div>
    )
  }

  handleScrolling() {
    this.props.actions.fetchMoreData(this.props.location.pathname);
  }

  renderLoading() {
    if (this.props.appState.is_loading) {
      return <Spinner/>;
    } else if (!this.props.appState.is_loading && this.props.appState.is_connected) {
      return <Waypoint onEnter={this.handleScrolling}/>;
    } else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <TopBar isConnected={this.props.appState.is_connected}
                scConnect={this.props.actions.scConnect}
                scDisconnect={this.props.actions.scDisconnect}/>
        {this.makeContent()}
        {this.renderLoading()}
        <Player tracks={this.props.userData.tracks}
                playerState={this.props.playerState}
                playTrack={this.props.actions.playTrack}
                streamTrack={this.props.actions.streamTrack}
                pauseTrack={this.props.actions.pauseTrack}
                resumeTrack={this.props.actions.resumeTrack}
                changeVolume={this.props.actions.changeVolume}
                updateTrackPosition={this.props.actions.updateTrackPosition}/>
      </div>
    );
  }
}

MainPage.propTypes = {
  userData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { userData, appState, playerState } = state;
  return {
    userData,
    appState,
    playerState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
