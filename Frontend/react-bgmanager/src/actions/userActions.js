import { USER_ACTIONS } from '../constants/userConstants';
import { postReq } from '../helpers/axiosHelpers';
import { success, error } from './alertActions';

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
