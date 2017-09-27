
import Main from './src/Pages/Main';
import Login from './src/Pages/Login';

export default {
	path: '/',
	indexRoute: {
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, Main)
			}, 'index')
		},
	},
	childRoutes: [
		{
			path: 'index',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, Main)
				}, 'index').default
			}
		},
		{
			path: 'login',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, Login)
				}, 'login').default
			}
		},
		{ // 404 页面
			path: '404',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, Login)
				}, '404').default
			}
		},
		{// 重定向
			path: '*',
			onEnter: (_, replaceState) => {replaceState("/404");}
		}
	]
}