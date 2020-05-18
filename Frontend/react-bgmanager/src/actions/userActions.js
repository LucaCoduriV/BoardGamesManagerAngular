import { API_BASE_URL } from '../config';
import { USER_ACTIONS } from '../constants/userConstants';
import { postReq } from '../helpers/axiosHelpers';

export const registerUser = (user) => (dispatch) => {
	return postReq(user, '/users').then(
		(res) => {
			dispatch({
				type: USER_ACTIONS.REGISTER_SUCCESS,
				payload: res.data,
			});
		},
		(err) => {
			dispatch({
				type: USER_ACTIONS.REGISTER_FAILURE,
				error: err,
			});
		}
	);
};
