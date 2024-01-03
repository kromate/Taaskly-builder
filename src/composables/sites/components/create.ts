import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { setFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'
import { useBuilderModal } from '@/composables/core/modals'

const createComponentForm = {
  name: ref(''),
  desc: ref(''),
  created_at: ref(serverTimestamp()),
  updated_at: ref(serverTimestamp())
}

const resetForm = () => {
  createComponentForm.name.value = ''
  createComponentForm.desc.value = ''
  createComponentForm.created_at.value = serverTimestamp()
  createComponentForm.updated_at.value = serverTimestamp()
}

export const useCreateComponent = () => {
  const loading = ref(false)
  const create = async (siteId:string) => {
    const component_id = uuidv4()
    const sentData = {
      id: component_id,

      site_id: siteId,
      name: createComponentForm.name.value,
      desc: createComponentForm.desc.value,
      created_at: createComponentForm.created_at.value,
      updated_at: createComponentForm.updated_at.value
    }

    try {
      loading.value = true
      await setFirestoreSubDocument('sites', siteId, 'components', component_id, sentData)
      useRouter().push(`/sites/${siteId}/components/${component_id}`)
      loading.value = false
      useBuilderModal().closeCreateComponent()
      resetForm()

      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Component created successfully'
      })
    } catch (e: any) {
      loading.value = false
      useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
    }
  }

  return { create, createComponentForm, loading }
}
