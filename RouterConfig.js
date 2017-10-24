
export default {
	path: '/',
	indexRoute: {
		onEnter: (_, replaceState) => { replaceState("/index"); }
	},
	childRoutes: [
		{
			path: 'index',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./src/index.jsx'))
				}, 'Main').default
			},
			childRoutes: [
				{
					path: '',
					indexRoute: {
						getComponent(nextState, cb) {
							require.ensure([], (require) => {
								cb(null, require('./src/Pages/Main'))
							}, 'Main')
						},
					}
				},
				{
					path: 'articallist',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./src/Pages/Artical'))
						}, 'ArticalList').default
					}
				},
				{
					path: 'articaldetail',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./src/Pages/Artical/ArticalDetail'))
						}, 'articaldetail').default
					}
				},
				{
					path: 'person',
					getComponent(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, require('./src/Pages/Person'))
						}, 'person').default
					},
					childRoutes: [
						{
							path: '',
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Main'))
									}, 'Main')
								},
							}
						},
						{
							path: 'articaledit',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('./src/Pages/Artical/ArticalEdit'))
								}, 'articaledit').default
							}
						}
					]
				}
			]
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