import { USER_ACTIONS } from '../constants/userConstants';

const initialState = {
	all: [],
	error: null,
	current: [],
	userid: 0,
	searched: [],
	message: null,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case USER_ACTIONS.GETALL_SUCCESS:
			return Object.assign({}, state, {
				all: action.payload.users,
			});
		case USER_ACTIONS.REGISTER_SUCCESS:
			return Object.assign({}, state, {
				userid: action.payload.userid,
				message: action.payload.message,
			});
		case USER_ACTIONS.REGISTER_FAILURE:
			return Object.assign({}, state, {
				error: action.error,
			});
	}
	return state;
}
