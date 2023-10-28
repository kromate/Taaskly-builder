import { useConfirmationModal } from '@/composables/core/confirmation'
import { deleteFirestoreSubCollectionDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'

const pageId = ref('')
const site_id = ref('')

export const useDeletePage = () => {
	const loading = ref(false)
    const setDeletePageId = ({ siteId, CompId }) => {
		site_id.value = siteId
		pageId.value = CompId
		// usePageModal().openDeletePage()
		useConfirmationModal().openAlert({ call_functuon: deletePage, desc: 'Are you sure you want to delete this page?', title: 'Delete Page', loading, type: 'Alert' })
	}
	const deletePage = async () => {
		loading.value = true
		try {
			await deleteFirestoreSubCollectionDocument('sites', site_id.value, 'pages', pageId.value)
            loading.value = false
            useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Page Deleted successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, deletePage, setDeletePageId }
}
