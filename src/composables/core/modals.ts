import { ref } from 'vue'
import { useModal } from './modal'
import Logout from '@/components/modals/logout.vue'
import LoginAlert from '@/components/modals/loginAlert.vue'
import DefaultVerification from '@/components/modals/verification/default.vue'
import MobileSidebar from '@/components/sidebars/MobileSidebar.vue'

type AuthTypes = 'Logout' | 'DefaultVerification' | 'LoginAlert'
type SidebarTypes = 'MobileSidebar'

const AuthModals = { Logout, DefaultVerification, LoginAlert } as Record<
  AuthTypes,
  any
>

const SidebarModals = {
  MobileSidebar
} as Record<SidebarTypes, any>

export const modal = useModal(ref([] as any))
const authModal = modal.register('Auth', AuthModals)
const sidebarModal = modal.register('Sidebar', SidebarModals)

export const useAuthModal = () => authModal
export const useSidebarModal = () => sidebarModal
