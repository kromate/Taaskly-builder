import send from '~~/src/assets/icons/src/send.vue'
import service from '~~/src/assets/icons/src/service.vue'
import shop from '~~/src/assets/icons/src/shop.vue'
import profile from '~~/src/assets/icons/src/profile.vue'
import help from '~~/src/assets/icons/src/help.vue'
import sites from '~~/src/assets/icons/src/sites.vue'

export const mainRoutes = [
	{
		icon: sites,
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

export const mainTopbarName = {
	'main-tasks-id': {
		name: 'Sites',
		can_go_back: true,
		back_routes: '/main/home'
	},
	'main-home': {
		name: 'Sites',
		can_go_back: false
	},
	'main-themes': {
		name: 'Themes',
		can_go_back: false
	},
	'main-domains': {
		name: 'Domains',
		can_go_back: false
	},
	'main-account': {
		name: 'Accounts',
		can_go_back: false
	},
	'main-support': {
		name: 'Support',
		can_go_back: false
	}
}

export const mainTopbarNameFunction = (name: string) => {
	if (name in mainTopbarName) {
		if (mainTopbarName[name].custom_name) {
			mainTopbarName[name].name = formatName(useRoute().params.id as string)
		}
		return mainTopbarName[name]
	}
	return { name }
}

const formatName = (name: string) => {
	if (name) return name.replaceAll('-', ' ')
}
