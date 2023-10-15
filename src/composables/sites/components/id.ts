import { getSingleFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'

const loading = ref(false)
const componentData = ref({} as Record<string, any>)
export const useFetchCompnentById = () => {
    const fetchComponentById = async (siteId:string, compId:string) => {
        loading.value = true
        try {
            const component = await getSingleFirestoreSubDocument('sites', siteId, 'components', compId)
            if (!component) throw new Error('component not found')
            componentData.value = component

			loading.value = false
        } catch (e: any) {
            loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
    }

	return { componentData, fetchComponentById, loading }
}