import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { registerUser } from '../../actions/userActions';
import { clear } from '../../actions/alertActions';
import { useDispatch, useSelector } from 'react-redux'; //Pour Redux. useDipatch permet le dispatch, useSelector permet de sélectionner la props que l'on souhaite affecter

//STYLE CSS DES COMPOSANTS
const useStyles = makeStyles((theme) => ({
	contentWrapper: {
		marginTop: 80,
		[theme.breakpoints.up('sm')]: {
			marginLeft: 240,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	alert: {
		marginBottom: 10,
	},
}));

//COMPOSANT MESSAGE D'ALERTE
function AlertPopUp(props) {
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

//COMPOSANT REGISTER FORM
export default function RegisterForm() {
	//HOOK
	const [username, setUsername] = useState(undefined);
	const [password, setPassword] = useState(undefined);

	const classes = useStyles();

	const dispatch = useDispatch();

	//ÉVÈNEMENT
	const handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		target.name === 'username' ? setUsername(value) : setPassword(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		postUser();
	};

	const postUser = () => {
		const user = {
			username: username,
			password: password,
		};
		dispatch(registerUser(user));
	};

	return (
		<div className={classes.contentWrapper}>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					{/* {alertMessage()} */}
					<AlertPopUp />
					<Avatar className={classes.avatar}>
						<AssignmentIndOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Inscription
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='username'
							label="Nom d'utilisateur"
							name='username'
							autoComplete='username'
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Mot de passe'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={handleChange}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							S'inscrire
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									{' '}
								</Link>
							</Grid>
							<Grid item>
								<Link href='/login' variant='body2'>
									Déjà inscrit ? Connectez-vous
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
}
