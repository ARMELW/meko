export const appPath = {
	public: {
		root: "/",
		register: "/register",
		login: "/login",
		forgotPassword: "/forgot-password",
		resetPassword: "/reset-password",
		test: '/test',
	},
	private: {
		profile: {
			root: "/profile",
			choose: "/profile/choose",
			createChild: "/profile/create-child",
			welcome: "/profile/welcome",
			avatar: "/profile/avatar",
		},
		home: "/home",
		module: {
			root: "/modules",
			detail: (moduleId: number) => `/modules/${moduleId}`,
		},
		lesson: {
			root: "/lessons",
			detail: (lessonId: number) => `/lessons/${lessonId}`,
		},
		monitoring: {
			root: "/monitoring",
			search: "/monitoring/search",
			child: {
				root: "/monitoring/child/subscriptions",
				add: "/monitoring/child/add",
				settings: "/monitoring/child/settings"
			},
		},
		settings: "/settings",
		subscription: {
			root: "/subscription",
			choose: "/subscription/choose",
			settings: "/subscription/settings",
			payment: "/subscription/payment",
		},
		child: {
			dashboard: "/child/dashboard",
		},
	},
	notFound: "*",
};
