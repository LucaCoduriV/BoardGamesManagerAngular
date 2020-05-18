import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles'; //Importation du theme personnalisé de material-ui
import theme from './theme';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './helpers/store';

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
