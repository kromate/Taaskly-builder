<template>
	<nav class="w-full md:h-20 h-[70px]  center fixed top-0 z-20 inset-x-0 bg-light border-b-[3px] border-dark md:px-[22px]">
		<header class="w-full container mx-auto shadow-nav md:shadow-none flex items-center justify-between z-20 px-5 md:px-0 ">
			<a href="/">
				<img src="/logo-site.svg" alt="logo" width="116" height="28">
			</a>

			<!-- <div class="pc items-center gap-4">
				<span v-for="link in links" :key="link.text" class="btn p-[10px] text-[#453131] font-medium">
					<a v-if="link.external" target="_blank" :href="link.route">
						{{ link.text }}
					</a>
					<nuxt-link v-else :to="link.route">
						{{ link.text }}
					</nuxt-link>
				</span>
			</div> -->

			<div v-if="false" class=" items-center justify-between gap-3 pc">
				<nuxt-link to="/auth/login" class="btn">
					Log In
				</nuxt-link>
				<nuxt-link to="/auth/register" class="btn btn-secondary">
					Sign up
				</nuxt-link>
			</div>
			<div v-else class=" items-center justify-between gap-3 pc">
				<nuxt-link to="/main/home" class="btn-secondary">
					Dashboard
				</nuxt-link>
			</div>

			<component :is="show ? close : menu" class="cursor-pointer mobile" @click="toggleMenu" />
		</header>
		<transition v-if="show" name="slide" appear>
			<div v-if="false" class="flex flex-col  absolute border-2 border-dark rounded top-20 py-7  w-11/12  px-7 bg-white md:hidden">
				<nuxt-link to="/auth/login" class="btn-secondary mb-4 w-full">
					Log In
				</nuxt-link>
				<nuxt-link to="/auth/register" class="btn-primary w-full">
					Sign up
				</nuxt-link>
			</div>
			<div v-else class="flex flex-col  absolute border-2 border-dark rounded top-20 py-7  w-11/12  px-7 bg-white md:hidden">
				<nuxt-link to="/main/home" class="btn-secondary">
					Dashboard
				</nuxt-link>
			</div>
		</transition>
	</nav>
</template>

<script setup lang="ts">
import { isLoggedIn, user, useUser } from '@/composables/auth/user'
import close from '@/assets/icons/src/close.vue'
import menu from '@/assets/icons/src/menu.vue'

const show = ref(false)
const toggleMenu = () => (show.value = !show.value)

const links = [
	{ text: 'Features', route: '/#features' },
	{ text: 'For businesses', route: '/business' },
	{ text: 'Refferal Leaderboard', route: '/leaderboard' },
	{ text: 'Join the Community', route: 'https://chat.whatsapp.com/DLv42eltnIX2AbRhv8eTZx', external: true }

]

</script>

<style scoped>
.mobile-link{
	@apply pb-4 font-medium
}
.btn {
	@apply text-sm w-24 h-10
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
