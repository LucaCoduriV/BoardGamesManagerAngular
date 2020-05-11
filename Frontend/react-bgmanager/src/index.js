import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles'; //Importation du theme personnalisé de material-ui
import theme from './theme';
import App from './components/App';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);
