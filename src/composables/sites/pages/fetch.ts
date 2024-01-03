import { getFirestoreSubCollection } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'

const page_list = ref([] as any)

export const useFetchSitePages = () => {
  const loading = ref(false)
  const fetch = async (id: string) => {
    if (page_list.value.length > 0) return
    loading.value = true
    try {
      await getFirestoreSubCollection('sites', id, 'pages', page_list)
      loading.value = false
    } catch (e: any) {
      loading.value = false
      useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
    }
  }

  return { page_list, fetch, loading }
}
