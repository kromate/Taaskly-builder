<template>
	<span
		v-if="name"
		class="py-1.5 px-4 font-medium text-sm  rounded-3xl bg-primary text-white"
	>
		<slot>{{ name }}</slot>
	</span>
</template>

<script setup lang='ts'>

// const toLowerCase = (val) => {
// 	return val.toLowerCase()
// }
// const toCapitalized = (data:string) => {
// const capitalized = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
//     return capitalized
// }

const props = defineProps<{
  name:number | string
}>()

const selectPalette = ref<{color:string, bg:string}>()

</script>
