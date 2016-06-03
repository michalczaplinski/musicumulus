/*eslint-disable import/default*/

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import initialState from './reducers/initialState';
import SC from 'soundcloud';

import './styles/styles.scss';


SC.initialize({
  client_id: initialState.client_id,
  redirect_uri: initialState.redirect_uri,
  oauth_token: window.localStorage.getItem('oauth_token') || undefined
});

const store = configureStore({
  appState: {
    is_connected: window.localStorage.getItem('is_connected') == 'true' || false,
    is_loading: true
  },
  userData: {
    tracks: []
  },
  playerState: {
    track_data: {},
    is_streaming: false,
    is_playing: false,
    track_position: 0
  }
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app')
);
