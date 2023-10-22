import { serverTimestamp } from 'firebase/firestore'
import { useStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { setFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'
import { useBuilderModal, useAuthModal } from '@/composables/core/modals'
import { useUser, isLoggedIn } from '@/composables/auth/user'
import { profileData } from '@/composables/auth/profile'

const createComponentForm = {
  name: ref(''),
  desc: ref(''),
  created_at: ref(serverTimestamp()),
  updated_at: ref(serverTimestamp())
}

const { id: user_id, username, user } = useUser()

const resetForm = () => {
  createComponentForm.name.value = ''
  createComponentForm.desc.value = ''
  createComponentForm.created_at.value = serverTimestamp()
  createComponentForm.updated_at.value = serverTimestamp()
}

export const useCreateComponent = () => {
  const loading = ref(false)
  const create = async (siteId:string) => {
    if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
    const component_id = uuidv4()
    const sentData = {
      id: component_id,
      user_id: user_id.value,
      site_id: siteId,
      name: `${createComponentForm.name.value}.vue`,
      desc: createComponentForm.desc.value,
      created_at: createComponentForm.created_at.value,
      updated_at: createComponentForm.updated_at.value
    }

    if (!user_id.value) {
      useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
      return
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
