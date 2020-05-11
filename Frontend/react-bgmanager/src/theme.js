//Ce fichier contient toutes les modifications apportées au thème de base de material-ui

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	//Valeur en pixel pour la taille d'écran (changement de mise en page à ces valeurs)
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 995,
			lg: 1280,
			xl: 1920,
		},
	},
});

export default theme;
