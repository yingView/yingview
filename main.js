import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import rootRoute from './RouterConfig';

window.hostname = 'http://127.0.0.1/';

require('./style');

ReactDOM.render(
	(
		<Router
			history={hashHistory}
			routes={rootRoute}
		/>
	), document.getElementById('app')
);
