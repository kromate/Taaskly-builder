import html2canvas from 'html2canvas'
import { useElementSize } from '@vueuse/core'
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

        const outputSection: HTMLIFrameElement = document.querySelector('#taaskly_iframe')?.contentWindow.document.body
         const { width, height } = useElementSize(outputSection)
        const canvas = await html2canvas(outputSection)
        // canvas.width = width.value
        // canvas.height = height.value

        // console.log(canvas, height, width)
        const dataURL = canvas.toDataURL('image/png')
        const url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')

        const data = {
            img_obj: {
                url,
                width: width.value,
                height: height.value
            },
            code: editorValue.value
        }
        try {
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
