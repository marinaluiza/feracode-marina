import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/index';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCamera, faPencilAlt, faSave} from '@fortawesome/free-solid-svg-icons';
import App from './App';

library.add(faCamera);
library.add(faPencilAlt);
library.add(faSave);

render(
    <Provider store={store}>
        <App/>
    </Provider>,

    document.getElementById('root')
);