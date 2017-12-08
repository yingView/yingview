const getCookie = (name) => {
    let i;
    let cookie;
    let cookieStr;
    const cookies = document.cookie.split(';');
    for (i = 0; i < cookies.length; i++) {
        cookie = cookies[i];
        cookieStr = cookie.split('=');
        if (cookieStr && cookieStr[0].replace(/^(\s*)|(\s*)$/g, '') === name) {
            return unescape(cookieStr[1]);
        }
    }
    return null;
};

// 是否有用户信息
let retView = false;
if (getCookie('user') && JSON.parse(getCookie('user')).userCode) {
	retView = true;
}

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
						}
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
					path: 'articaledit',
					getComponent(nextState, cb) {
						if (!retView) { // 如果没有登录, 限制访问
							window.location.href = '/#/login';
							return;
						}
						require.ensure([], (require) => {
							cb(null, require('./src/Pages/Artical/ArticalEdit'))
						}, 'articaledit').default
					}
				},
				{
					path: 'person',
					getComponent(nextState, cb) {
						if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
							window.location.href = '/#/login';
							return;
						}
						require.ensure([], (require) => {
							cb(null, require('./src/Pages/Person'))
						}, 'Person').default
					},
					childRoutes: [
						{
							path: '', // 文章
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'artical';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Artical.jsx'))
									}, 'Artical')
								}
							}
						},
						{
							path: 'artical', // 文章
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'artical';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Artical.jsx'))
									}, 'Artical')
								}
							}
						},
						{
							path: 'special', // 专栏
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'special';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/SpecialColumn.jsx'))
									}, 'SpecialColumn')
								}
							}
						},
						{
							path: 'album', // 相册
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'album';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Album.jsx'))
									}, 'Album')
								}
							}
						},
						{
							path: 'comment', // 评论
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'comment';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Comment.jsx'))
									}, 'Comment')
								}
							}
						},
						{
							path: 'fans', // 粉丝
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'fans';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Fans.jsx'))
									}, 'Fans')
								}
							}
						},
						{
							path: 'focus', // 关注
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'focus';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Focus.jsx'))
									}, 'Focus')
								}
							}
						},
						{
							path: 'setup', // 设置
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'setup';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Setup.jsx'))
									}, 'Setup')
								}
							}
						},
						{
							path: 'email', // 站内信
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									nextState.location.query.route = 'email';
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Person/Email.jsx'))
									}, 'Email')
								}
							}
						}
					]
				},
				{
					path: 'book',
					getComponent(nextState, cb) {
						if (!retView) { // 如果没有登录, 限制访问
							window.location.href = '/#/login';
							return;
						}
						require.ensure([], (require) => {
							cb(null, require('./src/Pages/Book'))
						}, 'Book').default
					},
					childRoutes: [
						{
							path: '', // 专栏详情
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Book/BookDetail.jsx'))
									}, 'BookDetail')
								}
							}
						},
						{
							path: 'bookDetail', // 专栏详情
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Book/BookDetail.jsx'))
									}, 'BookDetail')
								}
							}
						},
						{
							path: 'bookEdit', // 专栏编辑
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Book/BookEdit.jsx'))
									}, 'BookEdit')
								}
							}
						},
						{
							path: 'articalDetail', // 文章详情
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Book/ArticalDetail.jsx'))
									}, 'ArticalDetail')
								}
							}
						}
					]
				},
				{
					path: 'admin',
					getComponent(nextState, cb) {
						if (!retView) { // 如果没有登录, 限制访问
							window.location.href = '/#/login';
							return;
						}
						require.ensure([], (require) => {
							cb(null, require('./src/Pages/Admin'))
						}, 'Admin').default
					},
					childRoutes: [
						{
							path: '', // 管理页面
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Admin/index.js'))
									}, 'index')
								}
							}
						},
						{
							path: 'index', // 系统信息
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Admin/index.js'))
									}, 'index')
								}
							}
						},
						{
							path: 'setup', // 系统设置
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Admin/Setup.jsx'))
									}, 'Setup')
								}
							}
						},
						{
							path: 'user', // 用户管理
							indexRoute: {
								getComponent(nextState, cb) {
									if (!retView && !nextState.location.query.operate) { // 如果没有登录, 限制访问
										window.location.href = '/#/login';
										return;
									}
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Admin/User.jsx'))
									}, 'User')
								}
							}
						},
						{
							path: 'artical', // 文章管理
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Admin/Artical.jsx'))
									}, 'Artical')
								}
							}
						},
						{
							path: 'book', // 文章管理
							indexRoute: {
								getComponent(nextState, cb) {
									require.ensure([], (require) => {
										cb(null, require('./src/Pages/Admin/Book.jsx'))
									}, 'Book')
								}
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