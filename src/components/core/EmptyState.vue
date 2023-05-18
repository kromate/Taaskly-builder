<template>
	<div class="flex flex-col items-center justify-center border border-dark py-8 text-center">
		<h1 class="font-medium text-lg">
			{{ title }}
		</h1>
		<p class="italic text-sm mt-1">
			{{ desc }}
		</p>
		<div class="mt-4">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: 'Default Task Title'
    },
    desc: {
        type: String,
        default: 'default task description'
    }

})

</script>

<style>

</style>
