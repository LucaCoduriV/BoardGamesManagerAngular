import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//STYLE CSS DU COMPOSANT
const useStyles = makeStyles((theme) => ({
	contentWrapper: {
		marginTop: 100,
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
}));

//JSX DU COMPOSANT
export default function RegisterForm() {
	const classes = useStyles();

	return (
		<div className={classes.contentWrapper}>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<AssignmentIndOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Inscription
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label="Nom d'utilisateur"
							name='email'
							autoComplete='email'
							autoFocus
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
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							S'inscrire
						</Button>
					</form>
				</div>
			</Container>
		</div>
	);
}
