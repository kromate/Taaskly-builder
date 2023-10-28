import { getSingleFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'
import { ReplStore } from '@/editors/vue/store'

const loading = ref(false)
const pageData = ref({} as Record<string, any>)

export const useFetchCompnentById = () => {
    const fetchPageById = async (siteId: string, compId: string) => {
        loading.value = true
        try {
            const page = await getSingleFirestoreSubDocument('sites', siteId, 'pages', compId)
            if (!page) throw new Error('page not found')
            pageData.value = page

            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { pageData, fetchPageById, loading }
}
