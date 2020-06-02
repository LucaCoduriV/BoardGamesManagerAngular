import { COLLECTION_ACTIONS } from '../constants/collectionConstants';
import { postReq, getReq, deleteReq, putReq } from '../helpers/axiosHelpers';
import { success, error } from './alertActions';
import jwtDecode from 'jwt-decode';

export const getAllCollection = (idUser) => (dispatch) => {
	return getReq(`/users/${idUser}/games`).then(
		(res) => {
			dispatch({
				type: COLLECTION_ACTIONS.GETALL_SUCCESS,
				error: false,
				all: res.data,
			});
		},
		(err) => {
			dispatch({
				type: COLLECTION_ACTIONS.GETALL_FAILURE,
				error: true,
			});
			dispatch(error("La collection de jeu n'a pas peu être obtenue"));
		}
	);
};

export const deleteGame = (games, idGame, idUser) => (dispatch) => {
	return deleteReq(`/users/${idUser}/games/${idGame}`).then(
		(res) => {
			games = games.filter((game) => game.idGame !== idGame);
			console.table(games);
			dispatch({
				type: COLLECTION_ACTIONS.DELETE_SUCCESS,
				all: games,
				error: false,
			});
		},
		(err) => {
			dispatch({
				type: COLLECTION_ACTIONS.DELETE_FAILURE,
				error: true,
			});
			dispatch(error("Le jeu n'a pas pu être supprimé"));
		}
	);
};
