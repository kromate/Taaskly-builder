<template>
	<article
		class="border border-primary rounded-md w-w-full h-[450px] shadow-xl p-4 flex flex-col justify-between relative"
	>
		<div class="h-[250px] border-2 rounded-lg mb-5" />
		<div class="flex flex-col gap-1 mb-5">
			<h3 class="font-bold text-xl md:pr-6 pr-12">
				{{ data.name }}
			</h3>
			<span>{{ data.desc }}</span>
		</div>
		<div class="flex gap-3">
			<nuxt-link :to="`/sites/${site_id}/pages/${data.id}`" class="modal-btn">
				View Page
			</nuxt-link>
			<button class="modal-btn w-auto hover:bg-red hover:border-red" @click="setDeletePageId({siteId:site_id, CompId:data.id})">
				<Icon name="delete" class="w-5" />
			</button>
		</div>
	</article>
</template>

<script setup lang='ts'>
import { useDeletePage } from '@/composables/sites/pages/delete'

const site_id = useRoute().params.id as string

const { setDeletePageId } = useDeletePage()

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<style scoped></style>
