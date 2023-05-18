<template>
	<img
		v-if="src"
		:src="src"
		:style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
		class="!max-w-[1920px] rounded-full border border-dark"
	>
	<span
		v-else
		:style="`width: ${size}px; height: ${size}px; object-fit: cover;`"
		class="flex items-center justify-center uppercase  bg-faded_primary border border-[#69696a] text-dark font-bold rounded-full"
	>
		<span :style="`font-size: ${size/2}px;line-height: 1em`">{{ name[0] }}</span>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AvatarComp',
	props: {
		src: {
			type: String,
			default: null
		},
		name: {
			type: String,
			required: false,
			default: '#'
		},
		size: {
			required: false,
			type: Number,
			default: 36
		},
		editable: {
			type: Boolean,
			required: false,
			default: false
		}
	}

})

</script>
