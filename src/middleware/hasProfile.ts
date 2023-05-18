import { useUser } from '@/composables/auth/user'

export default function hasProfile(route: any) {
	if (process.client) {
		if (useUser().username.value) {
			return navigateTo('/main/home')
		}
	}
}
