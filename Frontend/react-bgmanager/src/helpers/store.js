import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
import alertReducer from '../reducers/alertReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers({
		users: userReducer,
		alerts: alertReducer,
	}),
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
