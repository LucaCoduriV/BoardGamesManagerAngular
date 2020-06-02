import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import LoginForm from './Forms/Login';
import RegisterForm from './Forms/Register';
import Collection from './Collection';
import UserList from './UsersList';
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
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.users.isLogged);
	const current = useSelector((state) => state.users.current);

	useEffect(() => {
		dispatch(getUserInfo());
	}, [dispatch]);

	return (
		<div className='App'>
			<div className={classes.contentWrapper}>
				<Router>
					<HeaderBar />
					<Route exact path='/' />
					<Route path='/login' component={LoginForm} />
					<Route path='/register' component={RegisterForm} />
					<Route path='/collection'>
						{isLogged ? <Collection /> : <Redirect to='/' />}
					</Route>
					<Route path='/admin'>
						{isLogged ? (
							current.superadmin === 1 ? (
								<UserList />
							) : (
								<Redirect to='/' />
							)
						) : (
							<Redirect to='/login' />
						)}
					</Route>
				</Router>
			</div>
		</div>
	);
}
