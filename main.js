import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import rootRoute from './RouterConfig';

require('./style');

ReactDOM.render(
	(
		<Router
			history={hashHistory}
			routes={rootRoute}
		/>
	), document.getElementById('app')
);
