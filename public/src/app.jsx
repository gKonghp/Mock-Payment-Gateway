"use strict";
import 'bootstrap/dist/css/bootstrap.css';
import routes from './routes/main.route.client.jsx';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { Provider } from 'react-redux'
import {Router} from 'react-router';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

// import createHistory from 'history/createBrowserHistory';

import {renderRoutes} from 'react-router-config';

const supportsHistory = window && window.history && 'pushState' in window.history ? true : false;

var store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
            <div>
                {renderRoutes(routes)}
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));