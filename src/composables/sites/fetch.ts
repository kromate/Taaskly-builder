import { getFirestoreCollection } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'

const site_list = ref([] as any)

export const useFetchUserSites = () => {
    const loading = ref(false)
    const fetch = async () => {
		if (site_list.value.length > 0) return
		loading.value = true
		try {
            await getFirestoreCollection('sites', site_list)
			loading.value = false
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}

	return { site_list, fetch, loading }
}
