import { updateFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'

type TComponentData = {
    props: Record<string, any>,
    serializedState: string,
    code: string,
    compiled_js: string,
    compiled_css: string,
}

export const getPropsFromString = (sourceCode: string): string[] => {
     const keysWithPropsValue = [] as any[]
     const startComment = '/*{'
  const endComment = '} */'
  const startIndex = sourceCode.indexOf(startComment)
  const endIndex = sourceCode.indexOf(endComment)

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Start and end comments not found.')
  }

    const jsonString = sourceCode.substring((startIndex - 1) + startComment.length, endIndex + 1)
    const parsedObject = JSON.parse(jsonString)

      for (const key in parsedObject) {
    if (parsedObject[key] === 'props') {
      keysWithPropsValue.push(key)
    }
  }

  return keysWithPropsValue
}

export const useUpdateComponent = () => {
    const updateCompLoading = ref(false)
    const updateComponent = async (siteId: string, compId: string, data: TComponentData) => {
        updateCompLoading.value = true
        try {
            // console.log(data)
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
