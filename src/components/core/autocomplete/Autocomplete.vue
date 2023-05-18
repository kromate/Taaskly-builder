<template>
	<div class="w-full">
		<input
			v-model="tagInput"
			type="text"
			:placeholder="placeholder"
			class="input-field"
			:disabled="tags.length >= tagsCount"
			@keyup.prevent.enter="addTag()"
			@keyup.space="addTag()"
			@keydown.prevent.tab="addTag()"
		>
		<span
			v-if="tags.length >= tagsCount"
			class="text-sm text-rose-600"
		>You can only enter {{ tagsCount }} tags</span>
		<div class="tags">
			<div class="flex gap-3 mt-3 flex-wrap">
				<span
					v-for="(tag, i) in tags"
					:key="i"
					class="flex gap-2 bg-grey_two px-3 py-1 rounded-md text-sm text-white"
				>
					{{ tag }}
					<Icon
						class="w-5 cursor-pointer"
						name="close"
						@click="removeTag(tag, i)"
					/>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	modelValue: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Enter tags' },
	tagsCount: {
		type: Number,
		default: 3,
		required: false
	}
})

const emit = defineEmits(['update'])

const tags = ref<any>(props.modelValue)
const tagInput = ref('')
watch(tagInput, () => {
	  if (tagInput.value.includes(',') || tagInput.value.includes(' ')) {
		tagInput.value = tagInput.value.replace(',', '').trim()
	addTag()
  }
})

const addTag = () => {
	if (tagInput.value.trim() === '') return
	tags.value.push(tagInput.value)
  const setArray = new Set(tags.value)
  tags.value = Array.from(setArray)
	emit('update', tags.value)
	tagInput.value = ''
}
const removeTag = (tag: string, index: number) => {
	tags.value.splice(index, 1)
	emit('update', tags.value)
}
</script>
