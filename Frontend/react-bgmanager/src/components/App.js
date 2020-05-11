import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import LoginForm from './Forms/Login';

export default function App() {
	return (
		<div className='App'>
			<HeaderBar />
			<Router>
				<Route exact path='/' />
				<Route path='/login' component={LoginForm} />
			</Router>
		</div>
	);
}
