import { USER_ACTIONS } from '../constants/userConstants';

const initialState = {
	all: [],
	current: {},
	error: null,
	isLogged: false, //Au lancement de la page, l'état initial est déterminé par la présence ou non d'un token dans le localstorage
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case USER_ACTIONS.GETALL_SUCCESS:
			return Object.assign({}, state, {
				all: action.all,
			});
		case USER_ACTIONS.GETALL_FAILURE:
			return Object.assign({}, state, {
				error: action.error,
			});
		case USER_ACTIONS.REGISTER_SUCCESS:
			return Object.assign({}, state, {
				error: action.error,
			});
		case USER_ACTIONS.REGISTER_FAILURE:
			return Object.assign({}, state, {
				error: action.error,
			});
		case USER_ACTIONS.LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isLogged: true,
				current: action.current,
			});
		case USER_ACTIONS.LOGIN_FAILURE:
			return Object.assign({}, state, {
				error: action.error,
			});
		case USER_ACTIONS.GET_CURRENT:
			return Object.assign({}, state, {
				current: action.current,
				isLogged: true,
			});
		case USER_ACTIONS.DELETE_SUCCESS:
			return Object.assign({}, state, {
				all: action.all,
				error: action.error,
			});
		case USER_ACTIONS.DELETE_FAILURE:
			return Object.assign({}, state, {
				error: action.error,
			});
		case USER_ACTIONS.LOGOUT: {
			return {
				...initialState,
			};
		}
		default:
			return state;
	}
}
