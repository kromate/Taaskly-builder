import { watchDebounced } from '@vueuse/core'
import { Ref } from 'vue'
import { useAlert } from '../core/useNotification'
import { ProfileType } from './types/profile'
import { setFirestoreDocument, getSingleFirestoreDocument } from '@/firebase/firestore'
import { useUser } from '@/composables/auth/user'
import { callFirebaseFunction } from '@/firebase/functions'

const profileFormState = {
	username: ref(''),
	first_name: ref(''),
	photo_url: ref(''),
	last_name: ref(''),
	email: ref(''),
	phone: ref(''),
	verified_level: ref(0),
	wallet_balance: ref(0),
	profile_level: ref(0),
	tasker_rating: ref(false),
	runner_rating: ref(false),
	created_at: ref(new Date().toISOString()),
	updated_at: ref(new Date().toISOString()),
	referrer: ref(''),
	reason: ref([])
}
export const profileData = ref({}) as Ref<ProfileType>

const { id } = useUser()
const formStep = ref(1)
export const useCreateProfile = () => {
	const loading = ref(false)
	const phoneNumError = ref()
	watch(profileFormState.phone, (val) => {
		if (val.toString().length < 10) {
			phoneNumError.value = 'Invalid Phone Number'
		} else {
			phoneNumError.value = null
		}
	})
	const createProfile = async () => {
		loading.value = true
		if (formStep.value === 1) {
			formStep.value = 2
			loading.value = false
			return
		}
		const profileUploadData = {
			id: id.value,
			username: profileFormState.username.value,
			first_name: profileFormState.first_name.value,
			last_name: profileFormState.last_name.value,
			email: profileFormState.email.value,
			phone: profileFormState.phone.value,
			verified_level: profileFormState.verified_level.value,
			profile_level: profileFormState.profile_level.value,
			tasker_rating: profileFormState.tasker_rating.value,
			runner_rating: profileFormState.runner_rating.value,
			created_at: profileFormState.created_at.value,
			updated_at: profileFormState.updated_at.value,
			referrer: profileFormState.referrer.value,
			reason: profileFormState.reason.value
		}

		try {
			await setFirestoreDocument(
				'users',
				useUser().id.value as string,
				profileUploadData
			)
			useUser().setProfileStatus(true)
			useUser().setProfileUsername(profileFormState.username.value)
			profileData.value = profileUploadData
			const redirectUrl = useUser().redirect.value
			useUser().redirect.value = null
			useRouter().push(redirectUrl ?? '/main/home')
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	const initForm = () => {
		profileFormState.email.value = useUser().user?.email as string
		profileFormState.photo_url.value = useUser().user?.photoURL as string
		profileFormState.first_name.value = useUser().user?.displayName?.split(
			' '
		)[0] as string
		profileFormState.last_name.value = useUser().user?.displayName?.split(
			' '
		)[1] as string
		profileFormState.referrer.value = process.client ? localStorage.getItem('taaskly_referral') as string : ''

		watch(profileFormState.referrer, () => {
			profileFormState.referrer.value =
			profileFormState.referrer.value.replace(/ /g, '').toLowerCase()
		 })
	}
	return {
		createProfile,
		formStep,
		profileFormState,
		loading,
		initForm,
		phoneNumError
	}
}

export const useProfile = () => {
	const loading = ref(false)
	const getProfile = async () => {
		loading.value = true
		if (profileData.value?.email || !id.value) {
			loading.value = false
			return
		}
		profileData.value = await getSingleFirestoreDocument(
			'users',
			id.value as string
		)
		loading.value = false
	}
	return { getProfile, profileData, loading }
}

export const useUsername = () => {
	const isUsernameAvailable = ref(true)
	const loading = ref(false)

	const checkUsername = async () => {
		loading.value = true
		profileFormState.username.value =
			profileFormState.username.value.replace(/ /g, '').toLowerCase()
		const isUsernameAvailableFuncValue = await getSingleFirestoreDocument(
			'usernames',
			profileFormState.username.value
		)
		if (isUsernameAvailableFuncValue) {
			isUsernameAvailable.value = false
		} else {
			isUsernameAvailable.value = true
		}
		loading.value = false
	}

	watchDebounced(profileFormState.username, checkUsername, { debounce: 500 })

	return { isUsernameAvailable, checkUsername, loading }
}
