import { User } from '@firebase/auth'
import { RemovableRef, useStorage } from '@vueuse/core'
// import { FirebaseUserType } from './types'
import { Ref } from 'vue'

interface globalStateType {
    userString: RemovableRef<string | null>,
    user: User | null,
    isLoggedIn: Ref<boolean>,
    hasAProfile: Ref<boolean>,
    isAdmin: Ref<boolean>,
    id: RemovableRef<string | null>,
    username: RemovableRef<string | null>,
    redirect: RemovableRef<string | null>
}

const globalState:globalStateType = {
    userString: useStorage('userString', null),
    user: useStorage('userString', '').value ? JSON.parse(useStorage('userString', '').value) as User : null,
    isLoggedIn: useStorage('isLoggedIn', false),
    hasAProfile: useStorage('hasAProfile', false),
    isAdmin: useStorage('isAdmin', false),
    username: useStorage('taaskly_username', ''),
    id: useStorage('id', null),
    redirect: useStorage('redirect', null)
}

export const useUser = () => {
    const setUser = (user: User, username?:string) => {
        globalState.userString.value = JSON.stringify(user) as any
        globalState.user = user
        globalState.id.value = user.uid
        globalState.isLoggedIn.value = true
    }
    const setProfileStatus = (status: boolean) => {
        globalState.hasAProfile.value = status
    }
    const setAdminStatus = (status: boolean) => {
        globalState.isAdmin.value = status
    }
    const setProfileUsername = (name: string) => {
        globalState.username.value = name
    }

    const clearUser = async () => {
        globalState.user = null
        globalState.userString.value = null
        globalState.isLoggedIn.value = false
        globalState.hasAProfile.value = false
        globalState.id.value = null
        globalState.username.value = null
    }

    return { setUser, clearUser, ...globalState, setProfileStatus, setProfileUsername, setAdminStatus }
}

export const isLoggedIn = globalState.isLoggedIn
export const user = useStorage('user', {} as Record<string, any>)

watch(isLoggedIn, (val) => {
    if (val) {
        user.value = {
            displayName: globalState.user?.displayName,
            photoURL: globalState.user?.photoURL
        }
    } else {
        user.value = {}
    }
})
