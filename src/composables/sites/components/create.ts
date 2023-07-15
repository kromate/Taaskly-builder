import { serverTimestamp } from 'firebase/firestore'
import { useStorage } from '@vueuse/core'
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
const site = localStorage.getItem('site')
  ? JSON.parse(localStorage.getItem('site')!)
  : null

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
      site_id: site.id,
      name: createComponentForm.name.value,
      desc: createComponentForm.desc.value,
      created_at: createComponentForm.created_at.value,
      updated_at: createComponentForm.updated_at.value,
      site: {
        id: site.id,
        type: site.type,
        name: site.name,
        desc: site.desc
      }
    }
    if (!user_id.value) {
      useAlert().openAlert({ type: 'ERROR', msg: 'UserId is missing' })
      return
    }
    console.log(site, sentData)
    try {
      loading.value = true
      await setFirestoreDocument('site_components', component_id, sentData)
      loading.value = false
      useCoreModal().closeCreateComponent()
      resetForm()
      useRouter().push(`/components/${component_id}/editor`)
      useAlert().openAlert({
        type: 'SUCCESS',
        msg: 'Component created successfully'
      })
    } catch (e: any) {
      console.log(e, 'error')
      loading.value = false
      useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
    }
  }

  return { create, createComponentForm, loading }
}
