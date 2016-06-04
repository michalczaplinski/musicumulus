import { combineReducers } from 'redux';
import objectAssign from 'object-assign';

import * as actions from '../actions/actionTypes';
import {trackFilter} from '../logic/logic';

function userData(state = {}, action) {
  switch (action.type) {

    case actions.RECEIVE_INITIAL_DATA:
      return objectAssign({}, state, {
        tracks: action.tracks
      });

    case actions.RECEIVE_USER_DATA:

      return objectAssign({}, state, {
        tracks: trackFilter(action.path, action.tracks),
        future_href: action.future_href,
        next_href: action.next_href
      });

    case actions.RECEIVE_MORE_DATA:

      return objectAssign({}, state, {
        tracks: state.tracks.concat(trackFilter(action.path, action.tracks)),
        future_href: action.future_href,
        next_href: action.next_href
      });

    default:
      return state;
  }
}

function appState(state = {}, action) {
  switch (action.type) {

    case actions.REQUEST_DATA:
      return objectAssign({}, state, {
        is_loading: true
      });

    case actions.RECEIVE_INITIAL_DATA:
    case actions.RECEIVE_USER_DATA:
    case actions.RECEIVE_MORE_DATA:
      return objectAssign({}, state, { is_loading: false });

    case actions.RECEIVE_CONNECTION:
      return objectAssign({}, state, {
        is_connected: action.is_connected,
        oauth_token: action.oauth_token
      });
    case actions.REMOVE_CONNECTION:
      return objectAssign({}, state, {
        is_connected: action.is_connected,
        oauth_token: undefined
      });

    default:
      return state;
  }
}

function playerState(state = {}, action) {
  switch (action.type) {

    case actions.STREAM_TRACK:
      return objectAssign({}, state, {
        track_data: action.trackData,
        is_streaming: action.is_streaming
      });

    case actions.PLAY_TRACK:
      return objectAssign({}, state, {
        is_playing: action.is_playing,
        track_id: action.track_id
      });

    case actions.RESUME_TRACK:
      return objectAssign({}, state, {
        is_playing: action.is_playing
      });

    case actions.PAUSE_TRACK:
      return objectAssign({}, state, {
        is_playing: action.is_playing
      });

    case actions.UPDATE_TRACK_POSITION:
      return objectAssign({}, state, {
        track_position: action.track_position
      });

    default:
      return state
  }
}

const rootReducer = combineReducers({
  userData,
  appState,
  playerState
});

export default rootReducer;
