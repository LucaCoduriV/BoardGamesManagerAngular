import { ALERT_ACTIONS } from '../constants/alertConstants';

export const success = (message) => {
	return { type: ALERT_ACTIONS.SUCCESS, message };
};

export const error = (message) => {
	return { type: ALERT_ACTIONS.ERROR, message };
};

export const clear = () => {
	return { type: ALERT_ACTIONS.CLEAR };
};
