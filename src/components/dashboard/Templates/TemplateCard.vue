<template>
	<article class="border border-primary rounded-md w-full h-[200px] shadow-xl p-4 flex flex-col justify-between relative">
		<div class="flex flex-col gap-1">
			<h3 class="font-bold text-xl md:pr-6 pr-12">
				{{ data.name }}
			</h3>
			<span>{{ data.desc }}</span>
		</div>

		<button class="modal-btn" @click="viewSite(data.id)">
			Explore
		</button>
	</article>
</template>

<script setup lang='ts'>

import { useFetchSitePages } from '@/composables/sites/pages/fetch'

const { fetch } = useFetchSitePages()

const viewSite = (id) => {
	fetch(id)
	useRouter().push(`/sites/${id}`)
}

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<style scoped></style>
