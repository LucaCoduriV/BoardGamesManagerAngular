import { USER_ACTIONS } from '../constants/userConstants';
import { postReq } from '../helpers/axiosHelpers';
import { success, error } from './alertActions';
import jwtDecode from 'jwt-decode';

export const registerUser = (user) => (dispatch) => {
	return postReq(user, '/users').then(
		(res) => {
			dispatch({
				type: USER_ACTIONS.REGISTER_SUCCESS,
				error: false,
			});
			dispatch(
				success('Inscription réussie ! Vous pouvez désormais vous connecter')
			);
		},
		(err) => {
			dispatch({
				type: USER_ACTIONS.REGISTER_FAILURE,
				error: true,
			});
			dispatch(error("Erreur ! Ce nom d'utilisateur est déjà pris"));
		}
	);
};

export const loginUser = (user) => (dispatch) => {
	return postReq(user, '/login').then(
		(res) => {
			localStorage.setItem('token', res.data.token); //on enregistre le token fournit par l'API dans le localStorage
			let token = localStorage.getItem('token');
			let current = jwtDecode(token);
			dispatch({
				type: USER_ACTIONS.LOGIN_SUCCESS,
				error: false,
				current: current,
			});
		},
		(err) => {
			dispatch({
				type: USER_ACTIONS.LOGIN_FAILURE,
				error: true,
			});
			dispatch(error("Erreur ! Nom d'utilisateur et/ou mot de passe faux"));
		}
	);
};

//Récupération des informations de l'utilisateur contenue dans le token
//(Chaque refresh clear le store)
export const getUserInfo = () => {
	if (localStorage.getItem('token') !== null) {
		let token = localStorage.getItem('token');
		let current = jwtDecode(token);
		return {
			type: USER_ACTIONS.GET_CURRENT,
			current: current,
		};
	}
	return null; //retour null obligé d'être spécifié
};

export const logout = () => {
	localStorage.removeItem('token');
	return { type: USER_ACTIONS.LOGOUT };
};
