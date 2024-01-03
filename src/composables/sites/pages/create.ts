import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { setFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'
import { useBuilderModal } from '@/composables/core/modals'

const createPageForm = {
  name: ref(''),
  desc: ref(''),
  created_at: ref(serverTimestamp()),
  updated_at: ref(serverTimestamp())
}

const resetForm = () => {
  createPageForm.name.value = ''
  createPageForm.desc.value = ''
  createPageForm.created_at.value = serverTimestamp()
  createPageForm.updated_at.value = serverTimestamp()
}

export const useCreatePage = () => {
  const loading = ref(false)
  const create = async (siteId:string) => {
    const page_id = uuidv4()
    const sentData = {
      id: page_id,
      site_id: siteId,
      name: createPageForm.name.value,
      desc: createPageForm.desc.value,
      created_at: createPageForm.created_at.value,
      updated_at: createPageForm.updated_at.value
    }

    try {
      loading.value = true
      await setFirestoreSubDocument('sites', siteId, 'pages', page_id, sentData)
      useRouter().push(`/sites/${siteId}/pages/${page_id}`)
      loading.value = false
      useBuilderModal().closeCreatePage()
      resetForm()

      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Page created successfully'
      })
    } catch (e: any) {
      loading.value = false
      useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
    }
  }

  return { create, createPageForm, loading }
}
