import { ref } from 'vue'
import { useModal } from './modal'
import Logout from '@/components/modals/logout.vue'
import CreateSite from '@/components/modals/CreateSite.vue'
import LoginAlert from '@/components/modals/loginAlert.vue'
import DefaultVerification from '@/components/modals/verification/default.vue'
import MobileSidebar from '@/components/sidebars/MobileSidebar.vue'

type AuthTypes = 'Logout' | 'DefaultVerification' | 'LoginAlert'
type SidebarTypes = 'MobileSidebar'
type CoreTypes = 'CreateSite'

const AuthModals = { Logout, DefaultVerification, LoginAlert } as Record<AuthTypes, any>
const SidebarModals = { MobileSidebar } as Record<SidebarTypes, any>
const CoreModals = { CreateSite } as Record<CoreTypes, any>

export const modal = useModal(ref([] as any))
const authModal = modal.register('Auth', AuthModals)
const sidebarModal = modal.register('Sidebar', SidebarModals)
const coreModal = modal.register('Core', CoreModals)

export const useAuthModal = () => authModal
export const useSidebarModal = () => sidebarModal
export const useCoreModal = () => coreModal
