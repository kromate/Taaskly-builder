import { iframe_content, useMountComponent } from './builder'
import { getSingleFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'

const loading = ref(false)
const pageData = ref({} as Record<string, any>)

const { loadCompArray } = useMountComponent()

export const useFetchPagenentById = () => {
    const fetchPageById = async (siteId: string, pageId: string) => {
        loading.value = true
        try {
            const page = await getSingleFirestoreSubDocument('sites', siteId, 'pages', pageId)
            if (!page) throw new Error('page not found')
            pageData.value = page

            if (page?.PageCompArray && page.PageCompArray?.length > 0) {
                loadCompArray(page.PageCompArray)
                iframe_content.value = page.iframe_content
            }
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { pageData, fetchPageById, loading }
}
