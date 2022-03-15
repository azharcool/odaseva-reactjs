import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';

import objReducer from './reducer';

export const createStorePersister = (storage) => {
    const store = createStore(objReducer, applyMiddleware(thunkMiddleware));
    const persister = persistStore(store);
    return { store, persister };
};
