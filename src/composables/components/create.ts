import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { setFirestoreDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'
import { useCoreModal, useAuthModal } from '@/composables/core/modals'
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
  const create = async () => {
    if (!isLoggedIn.value) return useAuthModal().openLoginAlert()
    const component_id = uuidv4()
    const sentData = {
      id: component_id,
      user_id: user_id.value,
      name: createComponentForm.name.value,
      desc: createComponentForm.desc.value,
      created_at: createComponentForm.created_at.value,
      updated_at: createComponentForm.updated_at.value,
      user: {
        id: user_id.value,
        username: username.value,
        email: user?.email || profileData.value.email,
        phone: profileData.value.phone || ''
      }
    }
    if (!user_id.value) {
      useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
      return
    }

    try {
      loading.value = true
      await setFirestoreDocument('components', component_id, sentData)
      loading.value = false
      useCoreModal().closeCreateSite()
      resetForm()
      useRouter().push(`/sites/${component_id}`)
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
