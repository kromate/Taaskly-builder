<template>
	<main class="flex flex-col ">
	<section class="w-full px-6 pb-12 antialiased ">
			<div class="mx-auto container">
				<NavBar />
				<div
					class="container py-24 md:py-36 mx-auto text-left md:max-w-none md:text-center"
				>
					<h1
						class="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-normal text-left text-gray-900 md:text-center sm:leading-none"
					>
						<span class="inline md:block">Spend more time Building</span>
						<span
							class="relative mt-2 bg-clip-text gradient md:inline-block pl-3"
						>
							and less time Coding</span
						>
					</h1>
					<div
						class="mx-auto mt-5 text-gray-700 md:mt-12 md:max-w-4xl md:text-center lg:text-lg font-semibold"
					>
						An Open Source Project that is focused on helping you spend less
						time on coding UI designs and more time building the actual
						application by providing already made components and pages
					</div>
					<div class="flex flex-col items-center mt-12 text-center w-full max-w-md mx-auto">
						<span class="relative flex w-full  gap-4">
							<nuxt-link to="#" class="btn-primary w-full"> Get Started </nuxt-link>
							<nuxt-link to="#" class="btn-secondary w-full"> Templates </nuxt-link>

						</span>
					</div>
				</div>
			</div>
		</section>
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
