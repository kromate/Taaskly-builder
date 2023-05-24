<template>
	<nav
		class="w-full  h-16 px-4  flex items-center justify-between box-border z-20 bg-white border-b border-dark"
	>
		<div class="items-center gap-4 mobile">
			<component :is="down" v-if="mainTopbarNameFunction($route.name as string).can_go_back" class="cursor-pointer z-50 rotate-90" @click="goBack( mainTopbarNameFunction($route.name as string))" />
			<component :is="menu" v-else class="cursor-pointer z-50" @click="useSidebarModal().openMobileSidebar()" />

			<h1 class="font-semibold text-lg capitalize">
				{{ mainTopbarNameFunction($route.name as string).name }}
			</h1>
		</div>

		<div class="items-center gap-3 pc">
			<component :is="down" v-if="mainTopbarNameFunction($route.name as string).can_go_back" class="cursor-pointer z-50 rotate-90" @click="goBack( mainTopbarNameFunction($route.name as string))" />
			<h1 class="font-semibold text-xl capitalize">
				{{ mainTopbarNameFunction($route.name as string).name }}
			</h1>
		</div>

		<div v-if="isLoggedIn" class="flex items-center gap-4">
			<div v-if="isLoggedIn" ref="target" class="flex flex-col relative">
				<div
					class="cursor-pointer flex items-center gap-2.5 rounded-md p-1.5 bg-gray-100"
					@click="toggleMenu"
				>
					<Avatar v-if="isLoggedIn" :name="username || (user?.displayName as string)" :src="(user?.photoURL as string)" />
					<div class="flex flex-col">
						<span class="text-sm font-semibold text-primary truncate w-20">{{ username || user?.displayName }}</span>
					</div>
					<down
						:class="[
							'ml-1 w-6 duration-300',
							showMenu ? 'rotate-180' : '',
						]"
					/>
				</div>
				<transition name="slide" appear :duration="500">
					<div
						v-if="showMenu"
						mode="out-in"
						class="bg-white z-20 px-4 shadow text-sm absolute top-[3.5rem] right-0 border border-primary w-72 rounded-md p-4"
					>
						<div class="flex flex-col pb-1 pt-2.5 gap-4 ">
							<nuxt-link
								to="/shop/reviews"
								class="cursor-pointer flex items-center text-greyDark text-base font-medium"
							>
								<shop class="w-6 text-greyDark mr-4" />
								Switch to Shop dashboard
							</nuxt-link>
							<nuxt-link
								to="/service/reviews"
								class="cursor-pointer flex items-center text-greyDark text-base font-medium"
							>
								<service class="w-6 text-greyDark mr-4" />
								Switch to Service dashboard
							</nuxt-link>
							<button
								class="cursor-pointer flex items-center  text-base font-medium"
								@click="useAuthModal().openLogout()"
							>
								<signOut class="w-6 mr-4" />
								Sign Out
							</button>
						</div>
					</div>
				</transition>
			</div>
		</div>
		<div v-else>
			<div v-if="!loading" class="flex gap-4">
				<button class="btn-secondary h-9 w-24" :disabled="loading" @click="googleSignin(true)">
					<span v-if="!loading"> 	Sign In</span>
					<Spinner v-else />
				</button>
				<button class="btn-secondary h-9 w-24" :disabled="loading" @click="googleSignin(true)">
					<span v-if="!loading"> 	Sign  Up</span>
					<Spinner v-else />
				</button>
			</div>
			<button v-else class="btn-secondary h-9 w-24" :disabled="loading">
				<Spinner />
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
import shop from '~~/src/assets/icons/src/shop.vue'
import service from '~~/src/assets/icons/src/service.vue'
import signOut from '~~/src/assets/icons/src/signOut.vue'
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
