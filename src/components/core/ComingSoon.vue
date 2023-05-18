<template>
	<section class="flex flex-col gap-4 justify-center items-center mt-6">
		<img :src="props.img" class="max-h-[255px]" alt=" Coming Soon illustration">

		<h2 class="text-2xl font-semibold text-center">
			{{ title }}
		</h2>
		<p class="md:text-lg font-normal text-center max-w-[550px] mx-auto" v-html="description" />
		<button class="btn bg-dark w-[60%] mx-auto mt-3 text-light" @click="btnFunction">
			{{ btnText }}
		</button>
	</section>
</template>

<script setup lang="ts">
// @ts-ignore
import defaultImg from '@/assets/images/main/coming_soon_service.svg'
interface Props {
	img: string;
	title: string;
	description: string;
	btnText: string;
	btnFunction: () => void;
}

const props = withDefaults(defineProps<Props>(), {
	img: defaultImg,
	title: 'Coming Soon',
	description: 'Coming Soon description',
	btnText: 'coming soon',
	btnFunction: () => { }
})
</script>

<style scoped>
/* .align-main-center{

} */
</style>
