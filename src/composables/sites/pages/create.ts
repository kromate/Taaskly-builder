import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { setFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/notification'
import { useBuilderModal, useAuthModal } from '@/composables/core/modals'
import { useUser, isLoggedIn } from '@/composables/auth/user'
import { profileData } from '@/composables/auth/profile'

const createPageForm = {
  name: ref(''),
  desc: ref(''),
  created_at: ref(serverTimestamp()),
  updated_at: ref(serverTimestamp())
}

const { id: user_id, username, user } = useUser()

const resetForm = () => {
  createPageForm.name.value = ''
  createPageForm.desc.value = ''
  createPageForm.created_at.value = serverTimestamp()
  createPageForm.updated_at.value = serverTimestamp()
}

export const useCreatePage = () => {
  const loading = ref(false)
  const create = async (siteId:string) => {
    if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
    const page_id = uuidv4()
    const sentData = {
      id: page_id,
      user_id: user_id.value,
      site_id: siteId,
      name: createPageForm.name.value,
      desc: createPageForm.desc.value,
      created_at: createPageForm.created_at.value,
      updated_at: createPageForm.updated_at.value
    }

    if (!user_id.value) {
      useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
      return
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
