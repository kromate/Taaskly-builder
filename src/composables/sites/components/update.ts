import { editorValue } from './editor'
import { updateFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'

type TComponentData = {
    props: Record<string, any>,
    serializedState: string,
    code: string,
    compiled_js: string,
    compiled_css: string,
}

export const useUpdateComponent = () => {
    const updateCompLoading = ref(false)
    const updateComponent = async (siteId: string, compId: string) => {
      updateCompLoading.value = true

      const data = {
        code: editorValue.value
      }
      try {
        console.log(data.code)

            await updateFirestoreSubDocument('sites', siteId, 'components', compId, data)
            useAlert().openAlert({ type: 'Alert', msg: 'saved' })
            updateCompLoading.value = false
        } catch (e: any) {
            updateCompLoading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { updateComponent, updateCompLoading }
}
