import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'; //useTheme sert à utiliser les modification du theme par défaut écrite dans "theme.js"
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import StarIcon from '@material-ui/icons/Star';
import DoneIcon from '@material-ui/icons/Done';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Hidden from '@material-ui/core/Hidden'; //Permet de cacher des éléments selon une taille d'écran définie dans les themes
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

const drawerWidth = 240; //Taille du menu tiroir gauche

//On utilsie le CSS ci-dessous
//Le param "theme" permet l'utilisation des modifications apportées au theme par defaut
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
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
	// Nécessaire pour que le contenu soit dessous la headerbar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
}));

export default function SearchAppBar(props) {
	const [anchorEl, setAnchorEl] = React.useState(null); //Hook d'état gérant le menu de compte sur petit écran. Masqué par défaut
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.users.isLogged);
	const username = useSelector((state) => state.users.username);
	const adminValue = useSelector((state) => state.users.adminValue);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget); //currentTarget = Menu qui s'affiche à l'endroit où l'évènement se produit
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleClose = () => {
		setAnchorEl(null); //fermeture du menu de compte sur petit écran
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const classes = useStyles(); //Permet la gestion des style CSS
	const theme = useTheme();
	const { window } = props;

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const drawer = () => {
		let adminDrawer = <div></div>;

		if (adminValue === 1) {
			adminDrawer = (
				<div>
					<Divider />
					<List>
						{['Administration'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									<SupervisorAccountIcon />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</div>
			);
		}

		return (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					{['Ma collection', 'Mes sondages'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <StarIcon /> : <DoneIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				{adminDrawer}
			</div>
		);
	};

	//MENU DE CONNEXION (PETITS ECRANS)
	const connectionMenuLinks = () => {
		if (isLogged) {
			return (
				<div>
					<MenuItem onClick={handleClose}>
						<Link
							href='#'
							underline='none'
							color='textPrimary'
							onClick={handleLogout}>
							Déconnexion
						</Link>
					</MenuItem>
				</div>
			);
		} else {
			return (
				<div>
					<MenuItem onClick={handleClose}>
						<Link href='/login' underline='none' color='textPrimary'>
							Connexion
						</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link href='/register' underline='none' color='textPrimary'>
							Inscription
						</Link>
					</MenuItem>
				</div>
			);
		}
	};

	//GROUPE DE BOUTON DE CONNEXION (ECRAN LARGE)
	const groupButton = () => {
		if (isLogged) {
			return (
				<ButtonGroup
					className={classes.buttonGroup}
					variant='text'
					aria-label='text button group'
					size='large'>
					<Button className={classes.button} onClick={handleLogout}>
						Déconnexion
					</Button>
				</ButtonGroup>
			);
		} else {
			return (
				<ButtonGroup
					className={classes.buttonGroup}
					variant='text'
					aria-label='text button group'
					size='large'>
					<Button className={classes.buttonLeft} href='/login'>
						Connexion
					</Button>
					<Button className={classes.button} href='/register'>
						Inscription
					</Button>
				</ButtonGroup>
			);
		}
	};

	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					{/* Bouton Hamburger lors de petit écrans */}
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerToggle}>
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
					{groupButton()}

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
						{connectionMenuLinks()}
					</Menu>
				</Toolbar>
			</AppBar>

			{/* MENU LATERAL GAUCHE */}
			<nav className={classes.drawer} aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation='css'>
					<Drawer
						container={container}
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}>
						{drawer()}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open>
						{drawer()}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}
