import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCollection, deleteGame } from '../actions/collectionActions';
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
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
	actions: {
		justifyContent: 'flex-end',
	},
}));

export default function Collection() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [rowsPerPage, setRowsPerPage] = useState(10); //Le nombre de jeux affichés au maximum
	const [page, setPage] = useState(0);

	const currentUser = useSelector((state) => state.users.current);
	const games = useSelector((state) => state.collections.all);

	//Permet la mise à jour du composant
	useEffect(() => {
		console.log('UseEffect');
		dispatch(getAllCollection(currentUser.idUser));
	}, [dispatch, games.length, currentUser.idUser]); //Appel de useEffect (et donc re-render) à chaque fois que la liste de jeux varie en taille

	const handleDeleteOne = (idGame) => {
		dispatch(deleteGame(games, idGame, currentUser));
	};

	const handlePageChange = (event, page) => {
		setPage(page);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(event.target.value);
	};

	console.table(games);

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
											<TableCell>Nom</TableCell>
											<TableCell />
										</TableRow>
									</TableHead>
									<TableBody>
										{
											(console.log('image: ' + games.image),
											games
												.slice(
													page * rowsPerPage,
													page * rowsPerPage + rowsPerPage
												)
												.map((game) => (
													<TableRow
														className={classes.tableRow}
														hover
														key={game.idGame}>
														<TableCell>
															<div className={classes.nameContainer}>
																<Avatar
																	alt='B'
																	className={classes.avatar}
																	src={game.image}
																	variant='rounded'>
																	{
																		game.name.charAt(
																			0
																		) /*Permet l'affichage de la première lettre du jeu s'il n'y a pas d'image*/
																	}
																</Avatar>
																<Typography variant='body1'>
																	{game.name}
																</Typography>
															</div>
														</TableCell>
														<TableCell padding='checkbox'>
															<IconButton
																onClick={() => handleDeleteOne(game.idGame)}>
																<DeleteIcon />
															</IconButton>
														</TableCell>
													</TableRow>
												)))
										}
									</TableBody>
								</Table>
							</div>
						</PerfectScrollbar>
					</CardContent>
					<CardActions className={classes.actions}>
						<TablePagination
							component='div'
							count={games.length}
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
