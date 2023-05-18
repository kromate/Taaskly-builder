<template>
	<div ref="target" class="flex flex-col relative">
		<div
			class="cursor-pointer border border-gray-400 flex justify-between items-center gap-2.5 rounded-md py-2 px-3 bg-white"
			@click="toggleMenu"
		>
			<div class="flex flex-col">
				<span class="text-sm font-semibold text-primary truncate">{{ isObjectType() ? selected!.name : selected }}</span>
			</div>

			<down
				:class="[
					'ml-1 w-6 duration-300',
					menuState ? 'rotate-180' : '',
				]"
			/>
		</div>
		<transition name="slide" appear :duration="500">
			<div
				v-if="menuState"
				mode="out-in"
				class="bg-white z-20 shadow text-sm absolute top-[3.5rem] right-0 border border-primary w-full rounded overflow-x-hidden max-h-[200px] overflow-y-auto"
			>
				<div v-if="options.length > 0" class="flex flex-col overflow-hidden">
					<button
						v-for="item in (options as any[])"
						:key="item"
						type="button"
						class="product_control_dropdown"
						@click="setViewState(item)"
					>
						{{ isObjectType() ? item.name : item }}
					</button>
				</div>
				<div v-else class="p-4">
					<p class="text-center">
						No options
					</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import down from '@/assets/icons/src/down.vue'

interface Iprops {
	modelValue: string | number | Record<any, any> | boolean | undefined
	options: string[] | number[] | Record<any, any>[] | boolean[]
}
type ValueType = string | number | Record<any, any> | boolean

const props = defineProps<Iprops>()

const emit = defineEmits(['update:modelValue'])
const menuState = ref(false)
const toggleMenu = () => {
    menuState.value = !menuState.value
}
const isObjectType = () => {
	if (typeof props.options[0] === 'object') {
		return true
	} else {
		return false
	}
}
const selected = ref(props.modelValue ?? 'Select Option') as any
if (isObjectType() && selected.value === 'Select Option') {
	selected.value.name = 'Select Option'
}

const closeMenu = () => (menuState.value = false)
const setViewState = (item: any) => {
    selected.value = item
    emit('update:modelValue', item)
	closeMenu()
}

</script>

<style scoped>

</style>
