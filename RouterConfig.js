
export default {
	path: '/',
	indexRoute: {
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, require('./src/Pages/Main'))
			}, 'Main')
		},
	},
	childRoutes: [
		{
			path: 'index',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/Pages/Main'))
				}, 'Main').default
			}
		},
		{
			path: 'login',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/Pages/Login'))
				}, 'Login').default
			}
		},
		{
			path: 'register',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/Pages/Register'))
				}, 'Register').default
			}
		},
		{
			path: 'admin',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/Pages/Admin'))
				}, 'Admin').default
			}
		},
		{
			path: 'artical',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/Pages/Artical'))
				}, 'Artical').default
			}
		},
		{
			path: 'person',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/Pages/Person'))
				}, 'Person').default
			}
		},
		{ // 404 页面
			path: '404',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/Pages/404'))
				}, '404').default
			}
		},
		{// 重定向
			path: '*',
			onEnter: (_, replaceState) => { replaceState("/404"); }
		}
	]
}