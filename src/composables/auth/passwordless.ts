import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, User } from 'firebase/auth'
import { useAuthModal } from '../core/modals'
import { useProfile } from './profile'
import { useUser } from '@/composables/auth/user'
import { authRef } from '~~/src/firebase/auth'
import { useAlert } from '@/composables/core/notification'

export const usePasswordlessSignin = () => {
	const actionCodeSettings = {
		url: `https://${location.host}/auth/authenticate`,
		handleCodeInApp: true

	}
	const loading = ref(false)
	const credentienals = {
		email: ref('')
    }
     const email = window.localStorage.getItem('emailForSignIn')
	const disabled = computed(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(credentienals.email.value)
	})
	const send_email = async () => {
		loading.value = true
		try {
			await sendSignInLinkToEmail(authRef, credentienals.email.value, actionCodeSettings)
			window.localStorage.setItem('emailForSignIn', credentienals.email.value)
			useRouter().push(`/auth/sentEmail/?email=${credentienals.email.value}`)
		} catch (e: any) {
			useAlert().openAlert({ type: 'ERROR', msg: e.message })
		}
		// loading.value = false
    }

    const initAuth = () => {
        if (isSignInWithEmailLink(authRef, window.location.href) && email) useSignInWithEmailLink(email)
    }

    const useSignInWithEmailLink = async (email: string) => {
        loading.value = true
        try {
            const result = await signInWithEmailLink(authRef, email, window.location.href)
             window.localStorage.removeItem('emailForSignIn')
            const user = result.user
            useUser().setUser(user as User)
			const token = await (useUser() as any)?.user?.auth.currentUser.getIdTokenResult()
			const hasProfile = token?.claims?.hasUpdatedProfile
			const username = token?.claims?.username
			const isAdmin = token?.claims?.isAdmin

			if (!hasProfile || !username) await useRouter().push('/auth/profile')
			useUser().setAdminStatus(isAdmin)
			useUser().setProfileStatus(hasProfile)
            useUser().setProfileUsername(username)
            await useProfile().getProfile()
			const redirectUrl = useUser().redirect.value
			useUser().redirect.value = null
			await useRouter().push(redirectUrl ?? '/main/home')
			await useAuthModal().closeAll()
			loading.value = false
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.message })
        }
    }

	return { credentienals, loading, disabled, send_email, initAuth, email, useSignInWithEmailLink }
}
