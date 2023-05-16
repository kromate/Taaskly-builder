<template>
	<main class="flex flex-col ">
	Hello
	</main>
</template>

<script lang="ts" setup>

const buttons = ref([
	{
		title: 'Outsource a Task',
		link: '/main/home',
		icon: 'post'
	},
	{
		title: 'Find a service',
		link: '/main/service',
		icon: 'search'
	},
	{
		title: 'Find a shop',
		link: '/main/shop',
		icon: 'biz'
	}
])

definePageMeta({
	layout: 'landing'
})
</script>

<style scoped>
h1 {
        font-size: clamp(40px, 8.8vw, 58px);
        font-weight: 800;
		line-height: clamp(40px, 9vw, 75px) ;
    }

</style>
