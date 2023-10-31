<template>
	<div />
</template>

<script setup lang="ts">
import { iframe_content } from '@/composables/sites/pages/builder'
import { useFetchPagenentById } from '@/composables/sites/pages/id'

const { fetchPageById, loading } = useFetchPagenentById()

const siteId = useRoute().params.id as string
const pageId = useRoute().params.pid as string

onMounted(async () => {
    await fetchPageById(siteId, pageId)
    const htmlElement = document.querySelector('html')

    if (htmlElement) {
        console.log(iframe_content)
            htmlElement.innerHTML = iframe_content.value

             const scripts = htmlElement.querySelectorAll('script')
        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script')
            Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value))
            newScript.appendChild(document.createTextNode(oldScript.innerHTML))
            oldScript?.parentNode?.replaceChild(newScript, oldScript)
        })
    } else {
        console.error('Could not find html element')
    }
})
</script>

<style scoped>

</style>
