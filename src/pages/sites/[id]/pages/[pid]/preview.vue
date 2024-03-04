<template>
	<iframe
		ref="iframe_preview"
		sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-top-navigation-by-user-activation allow-pointer-lock allow-downloads"
		frameBorder="0"
		class="fixed inset-0 h-screen w-screen"
		src="http://localhost:3000/sites/606885f2-c0e2-44b5-8acb-d4515174cd6d/pages/0e655157-edcf-4ed0-a0ae-fd9030ab5835/raw"
	/>
	<div class="fixed bottom-0 right-0 mb-4 mr-4 py-2 px-4 text-sm text-white bg-black rounded">
		made in Taaskly
	</div>
</template>

<script setup lang="ts">
// import { iframe_content } from '@/composables/sites/pages/builder'
// import { useFetchPagenentById } from '@/composables/sites/pages/id'

// const { fetchPageById, loading } = useFetchPagenentById()

const iframe_preview = ref<HTMLIFrameElement>()
const siteId = useRoute().params.id as string
const pageId = useRoute().params.pid as string

onMounted(async () => {
	// await fetchPageById(siteId, pageId)

	function getURLParams() {
  return window.location.search
}

// Function to set iframe src with parameters
function setIframeSrc(baseUrl) {
  const params = getURLParams()

  iframe_preview.value.src = baseUrl + params
}

const BASE_URL = location.origin
// Example usage
setIframeSrc(`${BASE_URL}/sites/${siteId}/pages/${pageId}/raw`)
})
</script>

<style scoped>

</style>
