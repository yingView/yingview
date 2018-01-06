import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Ajax, Utils } from 'yingview-form';
const { setCookie } = Utils;
import rootRoute from './RouterConfig';

window.hostname = 'http://127.0.0.1/';
// window.hostname = "";

Ajax.get({
	url: window.hostname + 'yingview.php',
	data: {
		p: 'admin'
	},
	dataType: 'json',
	success: (res) => {
		const { content } = res;
		if (content.isSuccess) {
			content.system = content.system || {};
			const systemInfo = {
				desc: content.system.desc,
				host: content.system.host,
				logo: content.system.logo && content.system.logo.viewAdd,
				logo2: content.system.logo && content.system.logo2.viewAdd,
				markLeft: content.system.markLeft,
				markRight: content.system.markRight,
				name: content.system.name
			}
			document.title = content.system.name || '鹰视觉-博客';
			const time = 1000 * 60 * 10;
			setCookie('systemInfo', JSON.stringify(systemInfo), time);
		}
	}
})

require('./style');
ReactDOM.render(
	(
		<Router
			history={hashHistory}
			routes={rootRoute}
		/>
	), document.getElementById('app')
);
