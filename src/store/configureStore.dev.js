import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import ReduxThunk from 'redux-thunk'
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import reduxUnhandledAction from "redux-unhandled-action";

import localStorageMiddleware from '../middleware/localStorageMiddleware';

export default function configureStore(initialState) {
  let store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
      localStorageMiddleware,
      immutableStateInvariantMiddleware(),
      reduxUnhandledAction(),
      ReduxThunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f //add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
