<template>
	<main class="flex flex-col items-center justify-center h-screen container px-4">
		<h1 class="font-black text-3xl md:text-5xl max-w-[800px] md:text-center mx-auto !leading-[1.25] tracking-[0.1px]">
			Create a <i>website</i>, <i>link in bio</i>, <i>forms</i>, <i>blogs</i>, and <i>online stores</i> in minutes
		</h1>
		<p class="mx-auto mt-5 md:mt-12 md:max-w-[700px] md:text-center md:text-lg font-medium">
			Taaskly sites allows developers to create websites, link in bio, forms, blogs, online stores basically anything you can imagine and then sell it on the marketplace to customers.
		</p>
		<div class="flex flex-col items-center mt-12 text-center w-full max-w-md mx-auto">
			<span class="relative flex w-full  gap-4">
				<nuxt-link to="#" class="btn-primary w-full"> Get Started </nuxt-link>
				<nuxt-link to="#" class="btn-secondary w-full"> Templates </nuxt-link>

			</span>
		</div>
	</main>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'landing'
})
</script>

<style scoped>
i {
	@apply underline
}
</style>
