<template>
	<div
		:close="closeModal"
		:class="[
			type == 'popup' ? 'bg-modal' : 'bg-sidebar',
			'transition-all modal-background',
		]"
		@click.self="autoClose ? close($el) : null"
	>
		<transition name="modal" appear>
			<div v-if="type == 'popup'" :class="[isFullHeight? 'isFullHeight':'isNotFullHeight','modal']">
				<header class="modal-title flex justify-between w-full items-center">
					<span :class="[noClose?'text-center w-full':'text-start']">{{ title }}</span>
					<icon
						v-if="!noClose"
						name="close"
						class="text-dark w-7 cursor-pointer  border-[1.5px] border-dark rounded-md"
						@click="closeModal()"
					/>
				</header>
				<div class="w-full relative">
					<slot />
				</div>
			</div>
		</transition>
		<transition v-if="type == 'sidebar'" name="slide" appear>
			<div class="sidebar">
				<slot />
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { PropType } from 'vue'
import { modal } from '@/composables/core/modals'
// window.addEventListener('resize', () => {
// closeModal()
// })
watch(useRoute(), (from, to) => {
	closeModal()
})
type modalTypes = 'popup' | 'sidebar';
const props = defineProps({
	noClose: {
		default: false,
		type: Boolean,
		required: false
	},
	autoClose: {
		default: true,
		type: Boolean,
		required: false
	},
	modal: {
		type: String,
		required: true
	},
	title: {
		default: 'Default Title',
		type: String,
		required: false
	},
	isFullHeight: {
		default: true,
		type: Boolean,
		required: false
	},
	type: {
		default: 'popup',
		type: String as PropType<modalTypes>,
		required: false
	}
})

const close = (e) => {
	if (
		typeof e.className === 'string' &&
		e.className.includes('modal-background')
	) {
	return closeModal()
	}
}

const closeModal = () => {
	modal.close(props.modal)
}
</script>

<style scoped lang="scss">
.isFullHeight {
	@apply h-screen sm:h-auto w-screen sm:w-[470px]
}
.isNotFullHeight{
	@apply h-auto w-[90vw] sm:w-[470px] rounded-sm;
	border-radius: 0.375rem;
}
.bg-modal {
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100vw;
	max-width: 100vw;
	min-height: 100%;
	z-index: 101;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(1.5px);
}
.bg-sidebar {
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	width: 100vw;
	max-width: 100vw;
	min-height: 100vh;
	z-index: 101;
	backdrop-filter: blur(1.5px);
}

.modal-enter-active,
.modal-leave-active {
	transition: all 0.23s linear;
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	@media screen and (max-width: 640px) {
		transform: translateY(1000vh);
	}
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
	transform: translateX(-500px);
}
</style>
