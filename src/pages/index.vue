<template>
	<main class="flex flex-col items-center justify-center text-white h-screen container px-4">
		<h1 class="font-black text-3xl md:text-5xl max-w-[800px] md:text-center mx-auto !leading-[1.25] tracking-[0.1px] mt-12">
			Create a <i>website</i>, <i>link in bio</i>, <i>forms</i>, <i>blogs</i>, and <i>online stores</i> in minutes
		</h1>
		<p class="mx-auto mt-5 md:mt-12 md:max-w-[700px] md:text-center md:text-lg font-medium">
			Taaskly sites allows users to browse through a variety of websites, link in bio, forms, blogs, online stores and more, select your desired sites and deploy in minutes.
		</p>
		<div class="flex flex-col items-center mt-12 text-center w-full max-w-md mx-auto">
			<span class="relative flex w-full  gap-4 md:justify-center">
				<nuxt-link to="/main/home" class="btn_home bg-[#B5AFFF] text-lg font-semibold text-black w-full"> Get started </nuxt-link>

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
.btn_home{
  @apply w-auto py-2 px-7;
  border-radius: 36px;
border: 1px solid #000;
background: var(--soft-purple, #B5AFFF);

/* Button shadow */
box-shadow: 4.28591px 3.4823px 0px 0px #000;
}
</style>
