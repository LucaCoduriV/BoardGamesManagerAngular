import { USER_ACTIONS } from '../constants/userConstants';
import { postReq } from '../helpers/axiosHelpers';
import { success, error } from './alertActions';
import jwtDecode from 'jwt-decode';

export const registerUser = (user) => (dispatch) => {
	return postReq(user, '/users').then(
		(res) => {
			dispatch({
				type: USER_ACTIONS.REGISTER_SUCCESS,
				payload: res.data,
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
			let decoded = jwtDecode(token);
			console.log(decoded);
			let adminValue = decoded.superadmin; //Récupération du niveau d'admin de l'utilisateur
			let username = decoded.username;
			let idUser = decoded.idUser;

			dispatch({
				type: USER_ACTIONS.LOGIN_SUCCESS,
				error: false,
				idUser: idUser,
				adminValue: adminValue,
				username: username,
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

export const logout = () => {
	localStorage.removeItem('token');
	return { type: USER_ACTIONS.LOGOUT };
};
