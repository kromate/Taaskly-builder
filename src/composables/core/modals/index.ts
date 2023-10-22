import { ref } from 'vue'
import { useModal } from '../modal'
import Logout from '@/components/modals/logout.vue'
import CreateSite from '@/components/modals/CreateSite.vue'
import CreateComponent from '@/components/modals/CreateComponent.vue'
import LoginAlert from '@/components/modals/loginAlert.vue'
import DefaultVerification from '@/components/modals/verification/default.vue'
import MobileSidebar from '@/components/sidebars/MobileSidebar.vue'
import Confirmation from '@/components/modals/core/Confirmation.vue'

type AuthTypes = 'Logout' | 'DefaultVerification' | 'LoginAlert'
type SidebarTypes = 'MobileSidebar'
type BuilderTypes = 'CreateSite' | 'CreateComponent'
type CoreTypes = 'Confirmation'

const AuthModals = { Logout, DefaultVerification, LoginAlert } as Record<AuthTypes, any>
const SidebarModals = { MobileSidebar } as Record<SidebarTypes, any>
const CoreModals = { Confirmation } as Record<CoreTypes, any>
const BuilderModals = { CreateSite, CreateComponent } as Record<BuilderTypes, any>

export const modal = useModal(ref([] as any))
const authModal = modal.register('Auth', AuthModals)
const sidebarModal = modal.register('Sidebar', SidebarModals)
const builderModal = modal.register('Builder', BuilderModals)
const coreModal = modal.register('Core', CoreModals)

export const useAuthModal = () => authModal
export const useSidebarModal = () => sidebarModal
export const useBuilderModal = () => builderModal
export const useCoreModal = () => coreModal
