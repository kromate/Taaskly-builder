import { User, getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import { useAuthModal } from '../core/modals'

import { useProfile } from './profile'
import { useUser } from '@/composables/auth/user'
import { googleAuth, signOutUser, authRef } from '~~/src/firebase/auth'
import { useAlert } from '@/composables/core/notification'
import { useLoading } from '~~/src/composables/core/useNotification'

export const useSignin = () => {
  const loading = ref(false)
  const googleSignin = async (saveRoute = false) => {
    if (saveRoute) useUser().redirect.value = useRoute().fullPath
    loading.value = true
    try {
      const user = await googleAuth()
      useUser().setUser(user as User)
      const token = await (
        useUser() as any
      )?.user?.auth.currentUser.getIdTokenResult()
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
    } catch {
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    useLoading().openLoading('Signing You out...😗')
    try {
      await signOutUser()
      await useRouter().push('/auth/login')
      useAuthModal().closeLogout()
      useAlert().openAlert({ type: 'SUCCESS', msg: 'Signed out successfully' })
    } catch {
      useLoading().closeLoading()
    }

    useLoading().closeLoading()
  }

  return { googleSignin, signOut, loading }
}
