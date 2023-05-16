import { ref } from 'vue'
import { useModal } from './modal'

// type AuthTypes = 'Logout' | 'DefaultVerification' | 'LoginAlert'

// const AuthModals = { Logout, DefaultVerification, LoginAlert } as Record<AuthTypes, any>

export const modal = useModal(ref([] as any))
// const authModal = modal.register('Auth', AuthModals)

// export const useAuthModal = () => authModal
