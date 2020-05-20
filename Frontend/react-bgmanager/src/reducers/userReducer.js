import { USER_ACTIONS } from '../constants/userConstants';

let token = localStorage.getItem('token');

const initialState = {
	all: [],
	current: [],
	username: '',
	error: null,
	idUser: 0,
	isLogged: token ? true : false, //Au lancement de la page, l'état initial est déterminé par la présence ou non d'un token dans le localstorage
	adminValue: 0,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case USER_ACTIONS.GETALL_SUCCESS:
			return Object.assign({}, state, {
				all: action.payload.users,
			});
		case USER_ACTIONS.REGISTER_SUCCESS:
			return Object.assign({}, state, {
				idUser: action.payload.userid, //payload = data du backend. userid = valeur renvoyée par le backend contenu dans l'objet payload
				error: action.error,
			});
		case USER_ACTIONS.REGISTER_FAILURE:
			return Object.assign({}, state, {
				error: action.error,
			});
		case USER_ACTIONS.LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isLogged: true,
				adminValue: action.adminValue,
				username: action.username,
				idUser: action.idUser,
			});
		case USER_ACTIONS.LOGIN_FAILURE:
			return Object.assign({}, state, {
				error: action.error,
			});
		case USER_ACTIONS.LOGOUT: {
			return Object.assign({}, state, {
				all: [],
				current: [],
				username: '',
				error: null,
				idUser: 0,
				isLogged: false,
				adminValue: 0,
			});
		}
		default:
			return state;
	}
}
