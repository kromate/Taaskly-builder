import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { setFirestoreDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'
import { useBuilderModal } from '@/composables/core/modals'

const createSiteForm = {
  name: ref(''),
  desc: ref(''),
  framework: ref('vanilla'),
  created_at: ref(serverTimestamp()),
  updated_at: ref(serverTimestamp())
}

const resetForm = () => {
  createSiteForm.name.value = ''
  createSiteForm.desc.value = ''
  createSiteForm.created_at.value = serverTimestamp()
  createSiteForm.updated_at.value = serverTimestamp()
}

export const useCreateSite = () => {
  const loading = ref(false)
  const create = async () => {
    const site_id = uuidv4()
    const sentData = {
      id: site_id,
      framework: createSiteForm.framework.value,
      name: createSiteForm.name.value,
      desc: createSiteForm.desc.value,
      created_at: createSiteForm.created_at.value,
      updated_at: createSiteForm.updated_at.value
    }

    try {
      loading.value = true
      await setFirestoreDocument('sites', site_id, sentData)
      loading.value = false
      useBuilderModal().closeCreateSite()
      resetForm()
      useRouter().push(`/sites/${site_id}`)
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Site created successfully'
      })
    } catch (e: any) {
      loading.value = false
      useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
    }
  }

  return { create, createSiteForm, loading }
}
