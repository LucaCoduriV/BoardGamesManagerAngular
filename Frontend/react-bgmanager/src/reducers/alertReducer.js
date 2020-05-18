import { ALERT_ACTIONS } from '../constants/alertConstants';

const initialState = {
	type: null,
	message: '',
	isShown: false,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ALERT_ACTIONS.SUCCESS:
			return Object.assign({}, state, {
				severity: 'success', //permet le changement de style de l'alert avec le material-ui
				message: action.message,
				isShown: true,
			});

		case ALERT_ACTIONS.ERROR:
			return Object.assign({}, state, {
				severity: 'error',
				message: action.message,
				isShown: true,
			});

		case ALERT_ACTIONS.CLEAR:
			return Object.assign({}, state, {
				isShown: false,
			});
		default:
			return state;
	}
}
