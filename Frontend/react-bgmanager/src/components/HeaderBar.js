import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const drawerWidth = 240; //Taille du menu tiroir gauche

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1, //Défini l'espacement en flexBox. (2 éléments = 1 à gauche + 1 à droite, 3 éléments = 1 gauche, 1 milieu, 1 droite)
	},
	menuButton: {
		marginRight: theme.spacing(2),
		display: 'block',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	menuIcon: {
		display: 'block',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			//Le titre s'affiche uniquement au-delà d'une certaine résolution
			display: 'block',
			marginRight: '10px',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			//Définition de style en hover
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '20ch',
			'&:focus': {
				width: '28ch', //Lors du focus, la barre de recherche s'élargi
			},
		},
	},
	buttonGroup: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
	},
	button: {
		color: 'white',
	},
	buttonLeft: {
		borderRight: '1px solid white !important', //Couleur de la séparation des boutons
		color: 'white',
	},
	accountButton: {
		display: 'block',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	accountIcon: {
		color: 'white',
	},
}));

export default function SearchAppBar() {
	const [anchorEl, setAnchorEl] = React.useState(false); //Hook d'état gérant le menu de compte sur petit écran. Masqué par défaut

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget); //currentTarget = Menu qui s'affiche à l'endroit où l'évènement se produit
	};

	const handleClose = () => {
		setAnchorEl(false); //fermeture du menu de compte sur petit écran
	};

	const classes = useStyles(); //Permet la gestion des style CSS

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					{/* Bouton Hamburger lors de petit écrans */}
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='open drawer'>
						<MenuIcon className={classes.menuIcon} />
					</IconButton>

					{/* Titre du site */}
					<Typography className={classes.title} variant='h6' noWrap>
						Board Games Manager
					</Typography>

					{/* Barre de recherche  */}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Recherche...'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>

					{/* Espacement entre barre et groupe de bouton */}
					<div className={classes.root} />

					{/* Bouton de gestion du compte en écran large*/}
					<ButtonGroup
						className={classes.buttonGroup}
						variant='text'
						aria-label='text button group'
						size='large'>
						<Button className={classes.buttonLeft}>Connexion</Button>
						<Button className={classes.button}>Inscription</Button>
					</ButtonGroup>

					{/* Bouton de gestion du compte + menu en petit écran*/}
					<IconButton className={classes.accountButton} onClick={handleClick}>
						<AccountCircleIcon className={classes.accountIcon} />
					</IconButton>
					<Menu
						id='simple-menu'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						<MenuItem onClick={handleClose}>Connexion</MenuItem>
						<MenuItem onClick={handleClose}>Inscription</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</div>
	);
}
