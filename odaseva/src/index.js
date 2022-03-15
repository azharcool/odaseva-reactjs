import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStorePersister } from 'generic';
import storage from 'redux-persist/lib/storage';

const { store } = createStorePersister(storage);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('divReactApp')
);

