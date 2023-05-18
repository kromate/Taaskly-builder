import { profileData } from './profile'
import { useUser } from '@/composables/auth/user'
import { setFirestoreDocument } from '@/firebase/firestore'
import { useAuthModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/useNotification'
import { uploadFirebasetorage } from '@/firebase/storage'
import { callFirebaseFunction } from '@/firebase/functions'

const { id } = useUser()
const verificationFormState = {
	student: ref('false'),
	id_type: ref(''),
	document: ref() as any
}

export const useVerification = () => {
	const loading = ref(false)
	const { percentage, upload, downloadURL } = uploadFirebasetorage()

	const verify = async () => {
		loading.value = true
		try {
			await setFirestoreDocument('verification', id.value as string, {
				student: verificationFormState.student.value,
				id_type: verificationFormState.id_type.value,
				createdAt: new Date().toISOString(),
				downloadURL: downloadURL.value
			})
			const res = await callFirebaseFunction('updateVerificationLevel', { level: 1 }) as any

			if (res) {
			loading.value = false
			profileData.value.verified_level = 1
			useAuthModal().closeDefaultVerification()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Verification submitted' })
			} else {
				loading.value = false
				useAlert().openAlert({ type: 'ERROR', msg: 'Verification failed' })
			}
		} catch (e:any) {
			useAlert().openAlert({ type: 'ERROR', msg: e.message })
			loading.value = false
		}
	}

	const uploadFile = async () => {
		loading.value = true
		try {
			upload(`Verification/${id.value}`, verificationFormState.document)
			loading.value = false
		} catch (e:any) {
			useAlert().openAlert({ type: 'ERROR', msg: e.message })
			loading.value = false
		}
	}

	return { verify, uploadFile, verificationFormState, loading, percentage }
}
