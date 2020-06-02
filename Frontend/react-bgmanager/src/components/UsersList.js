import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../actions/userActions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardActions,
	CardContent,
	Avatar,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TablePagination,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	root: {},
	wrapper: {
		[theme.breakpoints.up('sm')]: {
			marginLeft: 240,
		},
		padding: theme.spacing(3),
	},
	innerWrapper: {
		[theme.breakpoints.up('sm')]: {
			maxWidth: 700,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		marginTop: theme.spacing(2),
	},
	content: {
		padding: 0,
	},
	inner: {
		minWidth: 300,
	},
	nameContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
	actions: {
		justifyContent: 'flex-end',
	},
}));

export default function UsersTable() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [rowsPerPage, setRowsPerPage] = useState(10); //Le nombre d'utilisateur affiché au maximum
	const [page, setPage] = useState(0);

	const users = useSelector((state) => state.users.all);

	//Permet la mise à jour du composant
	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch, users.length]); //Appel de useEffect (et donc re-render) à chaque fois que la liste d'utilisateurs varie en taille

	const handleDeleteOne = (idUser) => {
		dispatch(deleteUser(users, idUser));
	};

	const handlePageChange = (event, page) => {
		setPage(page);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(event.target.value);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.innerWrapper}>
				<Card className={classes.root}>
					<CardContent className={classes.content}>
						<PerfectScrollbar>
							<div className={classes.inner}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Nom d'utilisateur</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{users
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((user) => (
												<TableRow
													className={classes.tableRow}
													hover
													key={user.idUser}>
													<TableCell>
														<div className={classes.nameContainer}>
															<Avatar
																className={classes.avatar}
																src={user.avatarUrl}></Avatar>
															<Typography variant='body1'>
																{user.login}
															</Typography>
														</div>
													</TableCell>
													<TableCell padding='checkbox'>
														<IconButton
															onClick={() => handleDeleteOne(user.idUser)}>
															<DeleteIcon />
														</IconButton>
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</div>
						</PerfectScrollbar>
					</CardContent>
					<CardActions className={classes.actions}>
						<TablePagination
							component='div'
							count={users.length}
							onChangePage={handlePageChange}
							onChangeRowsPerPage={handleRowsPerPageChange}
							page={page}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={[5, 10, 25, 50, 100]}
						/>
					</CardActions>
				</Card>
			</div>
		</div>
	);
}
