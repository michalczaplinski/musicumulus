import isEmpty from 'lodash.isempty';

export default function localStorageMiddleware({ dispatch, getState }) {
  return next => action => {

    if (!isEmpty(action.itemsToStore)) {
      action.itemsToStore.forEach((key) => {
        window.localStorage.setItem(key, action[key]);
        console.log(`%c stored:  ${key} = ${action[key]}`, "background: #E8E8E8; color: green");
      });
    }

    if (!isEmpty(action.itemsToRemove)) {
      action.itemsToRemove.forEach((key) => {
        window.localStorage.removeItem(key);
      })
    }

    return next(action);
  };
}
