import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { clear } from '../actions/alertActions';
import { useDispatch, useSelector } from 'react-redux'; //Pour Redux. useDipatch permet le dispatch, useSelector permet de sélectionner la props que l'on souhaite affecter

//STYLE CSS DU COMPOSANT
const useStyles = makeStyles((theme) => ({
	alert: {
		marginBottom: 10,
	},
}));

//COMPOSANT
export default function AlertPopUp() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const severity = useSelector((state) => state.alerts.severity); //Etat Redux de la sévérité du message (change son style avec material-ui)
	const message = useSelector((state) => state.alerts.message); //Etat Redux du message d'alert
	const isShown = useSelector((state) => state.alerts.isShown); //Etat Redux de l'affichage du message

	return (
		<div className={classes.alert}>
			<Collapse in={isShown}>
				<Alert
					severity={severity}
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={() => dispatch(clear())}>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}>
					{message}
				</Alert>
			</Collapse>
		</div>
	);
}
