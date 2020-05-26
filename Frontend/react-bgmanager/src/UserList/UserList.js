import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import { UsersTable } from './components';
import mockData from './data';

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

	const [users] = useState(mockData);

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<UsersTable users={users} />
			</div>
		</div>
	);
}
