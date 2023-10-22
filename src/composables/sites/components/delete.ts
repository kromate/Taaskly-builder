import { useConfirmationModal } from '@/composables/core/confirmation'
import { deleteFirestoreDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'

const deleteComponentId = ref('')

export const useDeleteComponent = () => {
	const loading = ref(false)
	const setDeleteComponentId = (id: string) => {
		deleteComponentId.value = id
		// useComponentModal().openDeleteComponent()
		useConfirmationModal().openAlert({ call_functuon: deleteComponent, desc: 'Are you sure you want to delete this component?', title: 'Delete Component', loading, type: 'Alert' })
	}
	const deleteComponent = async () => {
		loading.value = true
		try {
			await deleteFirestoreDocument('components', deleteComponentId.value)
			loading.value = false
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Component Deleted successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
	}
	return { loading, deleteComponent, setDeleteComponentId }
}
