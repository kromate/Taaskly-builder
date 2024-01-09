<template>
	<div ref="contentContainer" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { iframe_content } from '@/composables/sites/pages/builder'
import { useFetchPagenentById } from '@/composables/sites/pages/id'

const contentContainer = ref(null)
const { fetchPageById, loading } = useFetchPagenentById()
const route = useRoute()

const siteId = route.params.id
const pageId = route.params.pid

onMounted(async () => {
    if (typeof siteId !== 'string' || typeof pageId !== 'string') {
        console.error('Invalid site or page ID')
        return
    }

    try {
        await fetchPageById(siteId, pageId)
        insertContent()
    } catch (error) {
        console.error('Error fetching page', error)
    }
})

const insertContent = () => {
    if (contentContainer.value) {
        contentContainer.value.innerHTML = iframe_content.value

        const scripts = contentContainer.value.querySelectorAll('script')
        scripts.forEach((script) => {
            executeScript(script.textContent)
        })

        addBadge()
    } else {
        console.error('Content container not found')
    }
}

const executeScript = (scriptText) => {
    try {
        // eslint-disable-next-line no-new-func
        new Function(scriptText).call(window)
    } catch (error) {
        console.error('Error executing script', error)
    }
}

const addBadge = () => {
    const badge = document.createElement('div')
    badge.textContent = 'made in Taaskly'
    // badge.classList.add('fixed',
}

</script>
