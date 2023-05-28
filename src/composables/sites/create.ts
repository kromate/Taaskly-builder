import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { setFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'
import { useCoreModal, useAuthModal } from '@/composables/core/modals'
import { useUser, isLoggedIn } from '@/composables/auth/user'
import { profileData } from '@/composables/auth/profile'

const createSiteForm = {
    name: ref(''),
	created_at: ref(serverTimestamp()),
	updated_at: ref(serverTimestamp())
}

const { id: user_id, username, user } = useUser()

const resetForm = () => {
	createSiteForm.name.value = ''
	createSiteForm.created_at.value = serverTimestamp()
	createSiteForm.updated_at.value = serverTimestamp()
}

export const useCreateSite = () => {
	const loading = ref(false)
	const create = async () => {
		if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
		const sentData = {
			user_id: user_id.value,
			name: createSiteForm.name.value,
			created_at: createSiteForm.created_at.value,
			updated_at: createSiteForm.updated_at.value,
			user: {
				id: user_id.value,
				username: username.value,
				email: user?.email || profileData.value.email,
				phone: profileData.value.phone || ''
			}
		}
		if (!user_id.value) {
			useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
			return
        }
        const site_id = uuidv4()
		try {
			loading.value = true
			await setFirestoreSubDocument('users', user_id.value, 'sites', site_id, sentData)
			loading.value = false
            useCoreModal().closeCreateSite()
            resetForm()
            useRouter().push(`/sites/${site_id}`)
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Site created successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	return { create, createSiteForm, loading }
}
