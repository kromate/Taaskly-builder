import { getFirestoreSubCollection } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'
import { useUser, isLoggedIn } from '@/composables/auth/user'

const component_list = ref([] as any)

export const useFetchSiteComponents = () => {
  const loading = ref(false)
  const fetch = async (id:string) => {
    if (component_list.value.length > 0) return
    loading.value = true
    try {
      await getFirestoreSubCollection('sites', component_list)
      loading.value = false
    } catch (e: any) {
      loading.value = false
      useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
    }
  }

  return { component_list, fetch, loading }
}
