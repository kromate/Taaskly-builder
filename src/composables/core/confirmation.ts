import { useCoreModal } from './modals'

const confirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_functuon: ref(() => { }),
    loading: ref(false)

}

interface AlertTypes {
	type: 'Alert' | 'ERROR' | 'SUCCESS'
	desc: string
    title: string
    call_functuon: () => void
    loading: Ref<boolean>
}

export const useConfirmationModal = () => {
    const { openConfirmation, closeConfirmation } = useCoreModal()
    const openAlert = ({ type, desc, call_functuon, title, loading }: AlertTypes) => {
		confirmationState.type.value = type
        confirmationState.description.value = desc
        confirmationState.title.value = title
        confirmationState.call_functuon.value = call_functuon
        confirmationState.loading = loading

        openConfirmation()
	}
	const closeAlert = () => {
        confirmationState.description.value = ''
        confirmationState.title.value = ''
        confirmationState.call_functuon.value = () => { }
        closeConfirmation()
	}

	return { ...confirmationState, openAlert, closeAlert }
}
