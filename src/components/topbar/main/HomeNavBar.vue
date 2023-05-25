<template>
  <nav
    class="w-full md:h-20 h-[70px] center fixed top-0 z-20 inset-x-0 bg-light border-b-[3px] border-dark md:px-[22px]"
  >
    <header
      class="w-full container mx-auto shadow-nav md:shadow-none flex items-center justify-between z-20 px-5 md:px-0"
    >
      <a href="/">
        <img src="/logo-site.svg" alt="logo" width="116" height="28">
      </a>

      <div class="items-center justify-between gap-3 pc">
        <nuxt-link to="/auth/login" class="btn">
			Log In
		</nuxt-link>
        <nuxt-link to="/auth/register" class="btn btn-secondary">
          Sign up
        </nuxt-link>
      </div>
    </header>
  </nav>
</template>

<script setup lang="ts">
import close from '@/assets/icons/src/close.vue'
import menu from '@/assets/icons/src/menu.vue'
const show = ref(false)
const toggleMenu = () => (show.value = !show.value)

const links = [
  { text: 'Features', route: '/#features' },
  { text: 'For businesses', route: '/business' },
  { text: 'Refferal Leaderboard', route: '/leaderboard' },
  {
    text: 'Join the Community',
    route: 'https://chat.whatsapp.com/DLv42eltnIX2AbRhv8eTZx',
    external: true
  }
]
</script>

<style scoped>
.mobile-link {
  @apply pb-4 font-medium;
}
.btn {
  @apply text-sm w-24 h-10;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s linear;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-150px);
}
</style>
