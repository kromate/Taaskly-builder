import { useConfirmationModal } from '@/composables/core/confirmation'
import { deleteFirestoreSubCollectionDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'

const componentId = ref('')
const site_id = ref('')

export const useDeleteComponent = () => {
	const loading = ref(false)
    const setDeleteComponentId = ({ siteId, CompId }) => {
		site_id.value = siteId
		componentId.value = CompId
		// useComponentModal().openDeleteComponent()
		useConfirmationModal().openAlert({ call_functuon: deleteComponent, desc: 'Are you sure you want to delete this component?', title: 'Delete Component', loading, type: 'Alert' })
	}
	const deleteComponent = async () => {
		loading.value = true
		try {
			await deleteFirestoreSubCollectionDocument('sites', site_id.value, 'components', componentId.value)
            loading.value = false
            useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Component Deleted successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, deleteComponent, setDeleteComponentId }
}
