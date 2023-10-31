<template>
	<div ref="target" class="relative w-full">
		<input
			type="text"
			class="input-field"
			:placeholder="loading ? 'Loading..' : placeholder"
			:disabled="loading || disabled"
			@input="handleInput"
			@focus="showSuggestions"
		>
		<div class="flex  gap-3 mt-3  items-center">
			<span v-for="(tag, i) in tags" :key="i" class="flex gap-2 bg-grey_two px-3 py-1 rounded-md text-sm text-white">
				{{ tag.name }}
				<Icon class="w-5 cursor-pointer" name="close" @click="removeTag(tag, i)" />
			</span>
		</div>

		<ul v-if="showingSuggestions" class="absolute z-10 w-full mt-1 bg-white border border-dark rounded-md shadow-lg">
			<div v-if="filteredItems.length > 0">
				<li v-for="item in (filteredItems as any)" :key="item.id" class="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md" @click="selectItem(item)">
					{{ item.name }}
				</li>
			</div>
			<div v-else>
				<slot name="empty">
					<li class="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
						No results found
					</li>
				</slot>
			</div>
		</ul>
	</div>
</template>

<script setup lang='ts'>
import { onClickOutside } from '@vueuse/core'
const target = ref(null)

const props = defineProps({
	modelValue: { type: Array, default: () => [] },
	options: { type: Array, default: () => [] },
	placeholder: { type: String, default: 'placeholder text' },
	loading: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const tags = ref<any>(props.modelValue)
if (typeof props.modelValue === 'string') {
	tags.value = []
}
const typedText = ref('')
const showingSuggestions = ref(false)
const selectedItem = ref({} as any)

const onBlur = () => {
	if (!selectedItem?.value?.name) {
		typedText.value = ''
	} else {
		typedText.value = selectedItem.value.name
	}
	showingSuggestions.value = false
}
const removeTag = (tag: string, index: number) => {
	tags.value.splice(index, 1)
	emit('update:modelValue', tags.value)
}

onClickOutside(target, onBlur)

const filteredItems = computed(() => {
	const idSet2 = new Set(props.modelValue.map((obj: any) => obj.id))
	return props.options.filter((obj: any) => !idSet2.has(obj.id))
})

const handleInput = (event) => {
	typedText.value = event.target.value
	showingSuggestions.value = true
}

const showSuggestions = () => {
	if (filteredItems.value.length > 0) {
		showingSuggestions.value = true
	}
}

const selectItem = (item) => {
	tags.value.push(item)
	emit('update:modelValue', tags.value)
	showingSuggestions.value = false
}

</script>
