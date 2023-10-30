import { useStorage } from '@vueuse/core'
import { useAlert } from '@/composables/core/notification'
import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useUser } from '@/composables/auth/user'
import { callFirebaseFunction } from '~~/src/firebase/functions'

export const currentUserProfile = useStorage('currentUserProfile', {} as any)
const { id: user_id, setProfileUsername, setProfileStatus } = useUser()
const loading = ref(false)

export const useCurrentUserProfile = () => {
    const fetchCurrentUserProfile = async () => {
        if (!user_id.value) {
            return
        }
        loading.value = true
        try {
            const user = await getSingleFirestoreDocument('users', user_id.value)
            if (user) {
                currentUserProfile.value = user
                if (user.username) {
                    setProfileUsername(user.username)
                    setProfileStatus(true)
                }
            } else currentUserProfile.value = {}
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { currentUserProfile, fetchCurrentUserProfile, loading }
}

const userProfileDetail = ref({} as any)
export const useFetchUserProfileByUserId = () => {
    const loading = ref(false)

    const fetchUserProfileByUserId = async (user_id: string) => {
        loading.value = true
        try {
            const res = await callFirebaseFunction('getUserProfile', { type: 'USERNAME', value: user_id }) as any
            if (res.code === 200) {
                userProfileDetail.value = res.msg
            } else {
                useAlert().openAlert({ type: 'ERROR', msg: `Error: ${res.msg}` })
                loading.value = false
            }
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { fetchUserProfileByUserId, loading, userProfileDetail }
}
