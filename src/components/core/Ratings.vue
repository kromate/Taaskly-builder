<template>
	<div class="flex items-center space-x-1">
		<button
			v-for="star in 5"
			:key="star"
			type="button"
			:class="{
				'text-yellow-500': star <= RatingRef,
				'text-gray-400': star > RatingRef,
				'cursor-pointer': editable
			}"
			@click="setRating(star)"
		>
			<svg
				class="w-8 h-8 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					v-if="star <= RatingRef"
					d="M12 17.27l-5.66 3.44a1 1 0 01-1.45-1.05l1.36-6.34L2.47 9.21a1 1 0 01.55-1.8l6.3-.54L11.3 2.5a1 1 0 011.8 0l2.98 5.87 6.3.54a1 1 0 01.55 1.8l-4.39 4.02 1.36 6.34a1 1 0 01-1.45 1.05L12 17.27z"
				/>
				<path
					v-else
					d="M12 17.27l-5.66 3.44a1 1 0 01-1.45-1.05l1.36-6.34L2.47 9.21a1 1 0 01.55-1.8l6.3-.54L11.3 2.5a1 1 0 011.8 0l2.98 5.87 6.3.54a1 1 0 01.55 1.8l-4.39 4.02 1.36 6.34a1 1 0 01-1.45 1.05L12 17.27z"
					opacity="0.4"
				/>
			</svg>
		</button>
	</div>
</template>

<script setup>

const props = defineProps({
	modelValue: {
	type: Number,
	required: true
  },
  editable: {
	type: Boolean,
	  required: false,
	  default: false
	},
	size: {
		type: Number,
		required: false,
		default: 5
  }
})
const emit = defineEmits(['update:modelValue'])
const RatingRef = ref(1)

onMounted(() => {
  RatingRef.value = props.modelValue
})

const setRating = (value) => {
	if (props.editable) {
	emit('update:modelValue', value)
    RatingRef.value = value
  }
}

</script>

<style>
button:focus {
  outline: none;
}
</style>
