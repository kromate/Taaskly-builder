<template>
  <nav
    class="w-full h-16 px-4 flex items-center justify-between box-border z-20 bg-white border-b border-dark"
  >
    <div class="items-center gap-4 mobile">
      <component
        :is="down"
        v-if="mainTopbarNameFunction($route.name as string).can_go_back"
        class="cursor-pointer z-50 rotate-90"
        @click="goBack( mainTopbarNameFunction($route.name as string))"
      />
      <component
        :is="menu"
        v-else
        class="cursor-pointer z-50"
        @click="useSidebarModal().openMobileSidebar()"
      />

      <h1 class="font-semibold text-lg capitalize">
        {{ mainTopbarNameFunction($route.name as string).name }}
      </h1>
    </div>

    <div class="items-center gap-3 pc">
      <component
        :is="down"
        v-if="mainTopbarNameFunction($route.name as string).can_go_back"
        class="cursor-pointer z-50 rotate-90"
        @click="goBack( mainTopbarNameFunction($route.name as string))"
      />
      <h1 class="font-semibold text-xl capitalize">
        {{ mainTopbarNameFunction($route.name as string).name }}
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <div class="w-full md:w-fit h-fit relative">
        <input
          type="text"
          class="input-field min-w-[250px] focus:border-[#4f1ded]"
          placeholder="Search Sites"
        />
      </div>
      <button
        class="modal-btn-sm text-[#4f1ded] border-[#4f1ded] hover:bg-[#4f1ded]"
      >
        <span> {{ mainTopbarNameFunction($route.name as string).button_title }} </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useAuthModal, useSidebarModal } from '@/composables/core/modals'
import { isLoggedIn, user, useUser } from '@/composables/auth/user'
import menu from '@/assets/icons/src/menu.vue'
import down from '~~/src/assets/icons/src/down.vue'
import { mainTopbarNameFunction } from '@/composables/utils/menu'
import { useSignin } from '@/composables/auth/auth'
import { is_dev } from '@/composables/utils/system'
const { googleSignin, loading } = useSignin()

const { username } = useUser()
const goBack = (data) => {
  if (data?.ignore_query_route) return useRouter().push(data.back_routes)
  if (window.history.length > 2) {
    useRouter().back()
  } else {
    useRouter().push('/main/home')
  }
}

const target = ref(null)
const showMenu = ref(false)
const closeMenu = () => (showMenu.value = false)
const toggleMenu = () => (showMenu.value = !showMenu.value)
onClickOutside(target, closeMenu)
</script>
