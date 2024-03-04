<template>
	<iframe
		ref="iframe_preview"
		sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-top-navigation-by-user-activation allow-pointer-lock allow-downloads"
		frameBorder="0"
		class="fixed inset-0 h-screen w-screen"
	/>
	<div class="fixed bottom-0 right-0 mb-4 mr-4 py-2 px-4 text-sm text-white bg-black rounded">
		made in Taaskly
	</div>
</template>

<script setup lang="ts">
import { iframe_content } from '@/composables/sites/pages/builder'
import { useFetchPagenentById } from '@/composables/sites/pages/id'

const { fetchPageById, loading } = useFetchPagenentById()

const iframe_preview = ref<HTMLIFrameElement>()
const siteId = useRoute().params.id as string
const pageId = useRoute().params.pid as string

onMounted(async () => {
    await fetchPageById(siteId, pageId)

         iframe_preview.value!.srcdoc = iframe_content.value
})
</script>

<style scoped>

</style>
