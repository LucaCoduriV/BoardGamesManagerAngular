import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import LoginForm from './Forms/Login';
import RegisterForm from './Forms/Register';
import UserList from '../UserList/UserList';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../actions/userActions';

const useStyles = makeStyles(() => ({
	contentWrapper: {
		marginTop: 50,
	},
}));

export default function App() {
	const classes = useStyles(); //Utilisation des styles
	const currentUser = useSelector((state) => state.users.current);
	const superadmin = currentUser.superadmin;
	const dispatch = useDispatch();

	const isAdmin = () => {
		console.log(currentUser);
		if (currentUser.username) {
			console.log(superadmin);
			return superadmin === 1 ? <UserList /> : <Redirect to='/' />;
		} else if (!localStorage.getItem('token')) {
			return <Redirect to='/' />;
		}
	};

	useEffect(() => {
		const action = getUserInfo(); //la fonction vérifie la présence d'un token puis récupère les infos d'utilisateur s'il est présent

		if (action !== null) {
			dispatch(action);
		}
	}, [dispatch]);

	return (
		<div className='App'>
			<div className={classes.contentWrapper}>
				<Router>
					<HeaderBar />
					<Route exact path='/' />
					<Route path='/login' component={LoginForm} />
					<Route path='/register' component={RegisterForm} />
					<Route exact path='/admin'>
						{isAdmin()}
					</Route>
				</Router>
			</div>
		</div>
	);
}
