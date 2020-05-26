import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertPopUp from '../Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { registerUser } from '../../actions/userActions';
import { useDispatch } from 'react-redux'; //Pour Redux. useDipatch permet le dispatch, useSelector permet de sélectionner la props que l'on souhaite affecter

//STYLE CSS DU COMPOSANT
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
	link: {
		fontSize: '0.875rem',
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		fontWeight: '400',
		lineHeight: '1.43',
		letterSpacing: '1.43',
		color: '#3f51b5',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}));

//COMPOSANT REGISTER FORM
export default function RegisterForm() {
	const classes = useStyles(); //Utilisation des styles
	const dispatch = useDispatch(); //Utilisation de Redux

	//HOOK D'ETAT
	const [username, setUsername] = useState(undefined);
	const [password, setPassword] = useState(undefined);

	//ÉVÈNEMENT
	const handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		target.name === 'username' ? setUsername(value) : setPassword(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const user = {
			username: username,
			password: password,
		};
		dispatch(registerUser(user)); //Action 'Register' envoyée avec ReduxpostUser();
	};

	return (
		<div className={classes.contentWrapper}>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
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
								<Link to='/'> </Link>
							</Grid>
							<Grid item>
								<Link className={classes.link} to='/login'>
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
