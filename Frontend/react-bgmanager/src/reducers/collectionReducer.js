import { COLLECTION_ACTIONS } from '../constants/collectionConstants';

const initialState = {
	all: [],
	current: [],
	error: false,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case COLLECTION_ACTIONS.GETALL_SUCCESS:
			return Object.assign({}, state, {
				all: action.all,
			});
		case COLLECTION_ACTIONS.GETALL_FAILURE:
			return Object.assign({}, state, {
				all: action.all,
			});
		case COLLECTION_ACTIONS.DELETE_SUCCESS:
			return Object.assign({}, state, {
				all: action.all,
			});
		case COLLECTION_ACTIONS.DELETE_FAILURE:
			return Object.assign({}, state, {
				all: action.all,
			});
		case COLLECTION_ACTIONS.DESTROY:
			return {
				...initialState,
			};
		default:
			return state;
	}
}
