<template>
	<section v-if="!loading" class="flex flex-col h-full">
		<header class="flex gap-4 justify-between mb-6">
			<button class="btn-primary" @click="previewClick()">
				<span v-if="!previewLoading">Preview</span>
				<Spinner v-else />
			</button>
			<button class="btn-primary" :disabled="updatePageLoading" @click="updatePage(siteId, pageId)">
				<span v-if="!updatePageLoading">Save Changes</span>
				<Spinner v-else />
			</button>
		</header>

		<main class=" border-2 w-full h-full flex flex-col">
			<!-- <DashboardPagesPreview :html="comp.hashed_code.html" :css="comp.hashed_code.css" :js="comp.hashed_code.js" v-for="comp in mountedComponent" :key="comp.id" /> -->
			<iframe :srcdoc="iframe_srcdoc" />
		</main>
	</section>

	<Skeleton v-else height="100%" />
</template>

<script setup lang="ts">
import { useMountComponent } from '@/composables/sites/pages/builder'
import { useUpdatePage } from '@/composables/sites/pages/update'
import { useFetchPagenentById } from '@/composables/sites/pages/id'

const { fetchPageById, loading } = useFetchPagenentById()

const { updatePage, updatePageLoading } = useUpdatePage()
const { iframe_srcdoc, preview } = useMountComponent()

const previewLoading = ref(false)

const previewClick = async () => {
	previewLoading.value = true
	await updatePage(siteId, pageId)
	preview()
	previewLoading.value = false
}

const siteId = useRoute().params.id as string
const pageId = useRoute().params.pid as string

fetchPageById(siteId, pageId)

</script>

<style>
iframe {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #fff;
}
</style>
