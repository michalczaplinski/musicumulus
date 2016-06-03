import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

import ReduxThunk from 'redux-thunk'
import localStorageMiddleware from '../middleware/localStorageMiddleware';


export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(
    localStorageMiddleware,
    ReduxThunk
    )
  );
}
