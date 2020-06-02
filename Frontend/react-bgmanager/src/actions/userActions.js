import { USER_ACTIONS } from '../constants/userConstants';
import { postReq, getReq, deleteReq } from '../helpers/axiosHelpers';
import { success, error } from './alertActions';
import jwtDecode from 'jwt-decode';

export const registerUser = (user) => (dispatch) => {
	postReq(user, '/users').then(
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
	postReq(user, '/login').then(
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
export const getUserInfo = () => (dispatch) => {
	console.log('Enter GetUserInfo');
	let token = localStorage.getItem('token');
	if (token !== null) {
		let current = jwtDecode(token);
		console.log('GetToken');
		dispatch({
			type: USER_ACTIONS.GET_CURRENT,
			current: current,
		});
	}
	//return null; //retour null obligé d'être spécifié
};

export const getAllUsers = () => (dispatch) => {
	console.log('Get all users');
	getReq('/users').then(
		(res) => {
			dispatch({
				type: USER_ACTIONS.GETALL_SUCCESS,
				error: false,
				all: res.data,
			});
		},
		(err) => {
			dispatch({
				type: USER_ACTIONS.GETALL_FAILURE,
				error: true,
			});
			dispatch(error("La liste des utilisateurs n'a pas peu être obtenue"));
		}
	);
};

export const deleteUser = (users, idUser) => (dispatch) => {
	return deleteReq(`/users/${idUser}`).then(
		(res) => {
			/*let userIndex = users.findIndex((x) => x.idUser === idUser);
			users.splice(userIndex, 1); //*/
			users = users.filter((user) => user.idUser !== idUser);
			console.table(users);
			dispatch({
				type: USER_ACTIONS.DELETE_SUCCESS,
				all: users,
				error: false,
			});
		},
		(err) => {
			dispatch({
				type: USER_ACTIONS.DELETE_FAILURE,
				error: true,
			});
			dispatch(error("L'utilisateur n'a pas pu être supprimé"));
		}
	);
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('token');
	dispatch({ type: USER_ACTIONS.LOGOUT });
};
