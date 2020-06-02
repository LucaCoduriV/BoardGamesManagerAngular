import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
import alertReducer from '../reducers/alertReducer';
import collectionReducer from '../reducers/collectionReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers({
		users: userReducer,
		alerts: alertReducer,
		collections: collectionReducer,
	}),
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
