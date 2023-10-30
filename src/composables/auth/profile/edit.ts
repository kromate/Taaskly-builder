import { serverTimestamp } from 'firebase/firestore'
import { currentUserProfile, useCurrentUserProfile } from '@/composables/auth/profile/fetch'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'
import { useAlert } from '@/composables/core/notification'
import { useAuthModal } from '@/composables/core/modals'
import { useUser, isLoggedIn } from '@/composables/auth/user'

const isDisabled = ref(true)
const { id: user_id } = useUser()

const userProfileForm = {
    bio: ref(''),
    updated_at: ref(serverTimestamp()),
    skills: ref([]),
    location: ref({
        geohash: '',
        location: {
            name: '',
            lng: 0,
            lat: 0
        }
    }),
    links: ref({
        whatsapp: '',
        facebook: '',
        instagram: '',
        twitter: ''
    })
}

const populateData = () => {
    userProfileForm.bio.value = currentUserProfile.value.bio
    userProfileForm.updated_at.value = serverTimestamp()
    userProfileForm.skills.value = currentUserProfile.value.skills
    userProfileForm.location.value = {
        geohash: currentUserProfile.value.geohash,
        location: {
            name: currentUserProfile?.value?.location?.name,
            lng: currentUserProfile?.value?.location?.lng,
            lat: currentUserProfile?.value?.location?.lat
        }
    }
    userProfileForm.links.value = {
        whatsapp: currentUserProfile.value.links?.whatsapp ?? '',
        facebook: currentUserProfile.value.links?.facebook ?? '',
        instagram: currentUserProfile.value.links?.instagram ?? '',
        twitter: currentUserProfile.value.links?.twitter ?? ''
    }
}

export const useUpdateUserProfile = () => {
    const loading = ref(false)
    const update = async () => {
        if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
        const sentData = {
            bio: userProfileForm.bio.value,
            updated_at: serverTimestamp(),
            skills: userProfileForm.skills.value,
            ...userProfileForm.location.value,
            links: {
                whatsapp: userProfileForm.links.value.whatsapp,
                facebook: userProfileForm.links.value.facebook,
                instagram: userProfileForm.links.value.instagram,
                twitter: userProfileForm.links.value.twitter
            }
        }
        if (!user_id.value) {
            useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
            return
        }
        try {
            loading.value = true
            await updateFirestoreDocument('users', user_id.value, sentData)
            currentUserProfile.value = sentData
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Profile updated successfully' })
            useCurrentUserProfile().fetchCurrentUserProfile()
            isDisabled.value = true
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    const updatePhoto = async (url: string) => {
        if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
        if (!user_id.value) {
            useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
            return
        }
        try {
            loading.value = true
            await updateFirestoreDocument('users', user_id.value, {
                photo_url: url
            })
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Profile photo updated successfully' })
            useCurrentUserProfile().fetchCurrentUserProfile()
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { userProfileForm, update, loading, populateData, isDisabled, updatePhoto }
}

export const validate_data = (data: Record<string, any>, withAlert = true) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key]
            if (!value) {
                if (withAlert) {
                    useAlert().openAlert({ type: 'ERROR', msg: `Error: ${key} is required` })
                }
                return false
            }
            if (typeof value === 'object') {
                validate_data(value)
            }
        }
    }
    return true
}
