import * as types from './actionTypes';
import SC from 'soundcloud';

export function requestedData() {
  return {
    type: types.REQUEST_DATA,
    is_loading: true
  };
}

export function fetchInitialData() {
  return (dispatch) => {

    dispatch(requestedData());

    SC.get('/tracks', {'limit': 30})
      .then(json => dispatch(receiveInitialData(json)))
      .catch(err => {
        throw err;
      });
  };
}

export function fetchUserData(path) {
  return (dispatch) => {

    dispatch(requestedData());

    SC.get('/me/activities/tracks', {limit: 50})
      .then(json => dispatch(receiveUserData(json, path)))
      .catch(err => {
        throw err;
      });
  };
}

export function fetchMoreData(path) {
  return (dispatch, getState) => {

    // the SoundCloud API returns the URL to the next datablock
    // since we are using the JS SDK, we just need the cursor attribute from the URL.
    let cursor = getState().userData.next_href.split('cursor=')[1];

    dispatch(requestedData());

    SC.get('/me/activities/tracks', {limit: 50, cursor: cursor})
      .then(json => dispatch(receiveMoreData(json, path)))
      .catch(err => {
        throw err;
      });
  }
}

export function receiveInitialData(json, path) {
  return (dispatch) => {
    dispatch({
      type: types.RECEIVE_INITIAL_DATA,
      path: path,
      tracks: json,
      is_loading: false,
      receivedAt: Date.now()
    });
  };
}

export function receiveUserData(json, path) {
  return {
    type: types.RECEIVE_USER_DATA,
    path: path,
    tracks: json.collection,
    future_href: json.future_href,
    next_href: json.next_href,
    is_loading: false,
    received_at: Date.now()
  };
}


export function receiveMoreData(json, path) {
  return {
    type: types.RECEIVE_MORE_DATA,
    path: path,
    tracks: json.collection,
    future_href: json.future_href,
    next_href: json.next_href,
    is_loading: false,
    received_at: Date.now()
  }
}


export function scConnect() {
  return (dispatch) =>  {

    let connection = SC.connect();

    return connection.then(data => {
      dispatch({
        type: types.RECEIVE_CONNECTION,
        oauth_token: data.oauth_token,
        is_connected: true,
        itemsToStore: ['oauth_token', 'is_connected']});
      // todo move the localStoreage payloads into their own actions

      dispatch(fetchUserData());

    })
    .catch(err => { throw err; });
  };
}

export function scDisconnect() {
  return {
    type: types.REMOVE_CONNECTION,
    is_connected: false,
    // todo move the localStoreage payloads into their own actions
    itemsToRemove: ['oauth_token'],
    itemsToStore: ['is_connected']}
}

export function streamTrack(trackData) {
  return {
    type: types.STREAM_TRACK,
    trackData: trackData,
    is_streaming: true
  }
}

export function playTrack(trackId) {
  return {
    type: types.PLAY_TRACK,
    is_playing: true,
    track_id: trackId,
    track_position: 0
  }
}

export function resumeTrack() {
  return {
    type: types.RESUME_TRACK,
    is_playing: true
  }
}

export function pauseTrack() {
  return {
    type: types.PAUSE_TRACK,
    is_playing: false
  }
}

export function changeVolume(volume, previous_volume) {
  return {
    type: types.CHANGE_VOLUME,
    volume: volume,
    previous_volume: previous_volume
  }
}

export function updateTrackPosition(position) {
  return {
    type: types.UPDATE_TRACK_POSITION,
    track_position: position
  }
}
