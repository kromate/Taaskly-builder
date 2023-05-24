<template>
	<Modal
		modal="$atts.modal"
		title="Menu"
		type="sidebar"
	>
		<aside
			class="relative h-full"
		>
			<div>
				<div class="flex items-center pl-4 mb-4 ">
					<img
						src="/logo-text.svg"
						alt="logo"
						class="h-8"
					>
				</div>

				<p v-if="user" class="text-xl font-medium ml-4 flex flex-col">
					<span class="text-gray-500">Hello</span>
					<span class="text-sm tx flex-wrap">{{ username || user.displayName?.split(' ')[0] }}</span>
				</p>

				<div class="relative mt-5 pt-4 border-t">
					<div v-for="n in mainRoutes" :key="n.name" class="w-full flex flex-col gap-4">
						<span>
							<nuxt-link
								:to="n.route"
								class="flex items-center black"
							>
								<component :is="n.icon" class="mr-4 w-5" />
								<!-- <icon :name="n.icon" class="mr-4 w-5" /> -->
								<p class="text-base">
									{{ n.name }}
								</p>
							</nuxt-link>
						</span>
					</div>
				</div>

				<!-- <div class="absolute bottom-12 flex flex-col w-full">
					<button class="btn  border border-primary w-full mt-3 hover:bg-primary hover:text-light transite" @click="hasAShop ? $router.push('/shop') : useCoreModal().openCreateShop()">
						{{ hasAShop ? 'Go To Shop' : 'Create a Shop' }}
					</button>
					<button class="btn  border border-secondary text-secondary w-full mt-3 hover:bg-secondary hover:text-light transite" @click="hasAService ? $router.push('/service') : useCoreModal().openCreateService()">
						{{ hasAService ? 'Go To Service':'Create a Service' }}
					</button>
				</div> -->
			</div>
		</aside>
	</Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/core/modal/Modal.vue'
import { useUser } from '@/composables/auth/user'
import { mainRoutes } from '@/composables/utils/menu'
const { user, username } = useUser()
</script>

<style scoped lang="scss">
a, .menu-btn {
	@apply text-primary w-[240px] h-[51px] px-4 text-base duration-[10ms] rounded

}
/* exact link will show the primary color for only the exact matching link */
a.router-link-exact-active.black {

	color: var(--light);
	background-color: var(--primary);
	font-weight: 500;
	& > svg {
		color: var(--light);
	}
}
.tx{
	overflow-wrap: anywhere;
}
</style>
