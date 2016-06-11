/* eslint-disable import/default */
/* global __DEV__ */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import SC from 'soundcloud';

import './styles/styles.scss';

SC.initialize({
  client_id: __DEV__ ? 'ac7b31ea50f2019f548ffb8f7056b41d' : 'b30cf4f7fff837accf670f849e9bd418',
  redirect_uri: __DEV__ ? 'http://localhost:3000/callback.html' : 'https://musicumul.us/callback.html',
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
    track_position: 0,
    volume: 0.5,
    previous_volume: 0.5
  }
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app')
);
