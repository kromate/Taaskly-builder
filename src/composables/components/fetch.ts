import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'
import { useUser, isLoggedIn } from '@/composables/auth/user'

const component_list = ref([] as any)

const site = localStorage.getItem('site')
  ? JSON.parse(localStorage.getItem('site')!)
  : null

export const useFetchUserComponents = () => {
  const loading = ref(false)
  const fetch = async () => {
    if (component_list.value.length > 0) return
    loading.value = true
    try {
      await getFirestoreCollectionWithWhereQuery(
        'site_components',
        component_list,
        { name: 'site_id', operator: '==', value: site?.id }
      )
      console.log(component_list.value)
      loading.value = false
    } catch (e: any) {
      loading.value = false
      useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
    }
  }

  return { component_list, fetch, loading }
}
