import { useUser } from '@/composables/auth/user'

export default function isAuthenticated(route: any) {
	if (process.client) {
		if (!useUser().isLoggedIn.value) {
		useUser().redirect.value = route.fullPath
		return navigateTo('/auth/login')
	}
	}
}
