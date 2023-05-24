import send from '~~/src/assets/icons/src/send.vue'
import service from '~~/src/assets/icons/src/service.vue'
import shop from '~~/src/assets/icons/src/shop.vue'
import profile from '~~/src/assets/icons/src/profile.vue'
import help from '~~/src/assets/icons/src/help.vue'

export const mainRoutes = [
	{
		icon: send,
		name: 'Sites',
		route: '/main/home'
	},
	{
		icon: shop,
		name: 'Themes',
		route: '/main/themes'
	},
	{
		icon: service,
		name: 'Domains',
		route: '/main/domains'
	},
	{
		icon: profile,
		name: 'Account',
		route: '/main/account'
	},
	{
		icon: help,
		name: 'Support',
		route: '/main/support'
	}

] as any
