import { watchDebounced, useStorage } from '@vueuse/core'
import { Ref } from 'vue'
import { ProfileType } from '@/composables/auth/types/profile'
import { useAlert } from '@/composables/core/notification'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useUser } from '@/composables/auth/user'

const profileFormState = {
	username: ref(''),
	first_name: ref(''),
	last_name: ref(''),
	photo_url: ref(''),
	email: ref(''),
	phone: ref(''),
	verified_level: ref(0),
	wallet_balance: ref(0),
	profile_level: ref(0),
	tasker_rating: ref(0),
	runner_rating: ref(0),
	created_at: ref(new Date().toISOString()),
	updated_at: ref(new Date().toISOString()),
	referrer: ref(''),
	reason: ref([])
}
export const profileData = useStorage('profileData', {}) as Ref<ProfileType>

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
			reason: profileFormState.reason.value,
			origin: 'site_builder'
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
		if (process.client && localStorage.getItem('taaskly_referral') && localStorage.getItem('taaskly_referral') !== 'null' && localStorage.getItem('taaskly_referral') !== 'undefined') {
			profileFormState.referrer.value = localStorage.getItem('taaskly_referral') as string
		}

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
