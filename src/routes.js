import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './components/App';
import MainPage from './containers/MainPage';
import SC from 'soundcloud';

export default (
  <Route path="/" component={App}  >
    <IndexRoute component={MainPage} onEnter={(nextState, replace) =>
      {SC.isConnected() ? replace('/hot') : nextState}}/>
    <Route path="hot" component={MainPage}/>
    <Route path="top" component={MainPage}/>
    <Route path="recent" component={MainPage}/>
  </Route>
);
