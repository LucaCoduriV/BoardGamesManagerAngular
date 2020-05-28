import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersTable } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('sm')]: {
			marginLeft: 240,
		},
		padding: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(2),
	},
}));

export default function UserList() {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	let users = useSelector((state) => state.users.all);

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<UsersTable users={users} />
			</div>
		</div>
	);
}
