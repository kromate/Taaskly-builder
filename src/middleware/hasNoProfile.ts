import { profileData } from '@/composables/auth'
import { useUser } from '@/composables/auth/user'

export default function hasNoProfile(route: any) {
	if (process.client) {
		if (useUser().isLoggedIn.value && !profileData.value.username) {
			useUser().redirect.value = route.fullPath
			return navigateTo('/auth/profile')
		}
	}
}
