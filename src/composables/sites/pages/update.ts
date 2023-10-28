import html2canvas from 'html2canvas'
import { useElementSize } from '@vueuse/core'
import { iframe_content, useMountComponent } from './builder'
import { updateFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'

const { mountedComponent } = useMountComponent()

export const useUpdatePage = () => {
    const updatePageLoading = ref(false)
    const updatePage = async (siteId: string, pageId: string) => {
        updatePageLoading.value = true

        // const outputSection: HTMLIFrameElement = (document.querySelector('#taaskly_iframe') as any)?.contentWindow.document.body
        //  const { width, height } = useElementSize(outputSection)
        // const canvas = await html2canvas(outputSection)
        // canvas.width = width.value
        // canvas.height = height.value

        // console.log(canvas, height, width)
        // const dataURL = canvas.toDataURL('image/png')
        // const url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')

        const data = {
            PageCompArray: mountedComponent.value,
            iframe_content: iframe_content.value
        }
        try {
            await updateFirestoreSubDocument('sites', siteId, 'pages', pageId, data)
            useAlert().openAlert({ type: 'Alert', msg: 'saved' })
            updatePageLoading.value = false
        } catch (e: any) {
            updatePageLoading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { updatePage, updatePageLoading }
}
