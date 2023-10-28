<template>
    <div />
</template>

<script setup lang="ts">
import { iframe_content } from '@/composables/sites/pages/builder'

onMounted(() => {
    const htmlElement = document.querySelector('html')

        if (htmlElement) {
            htmlElement.innerHTML = iframe_content.value

             const scripts = htmlElement.querySelectorAll('script')
        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script')
            Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value))
            newScript.appendChild(document.createTextNode(oldScript.innerHTML))
            oldScript.parentNode.replaceChild(newScript, oldScript)
        })
    } else {
        console.error('Could not find html element')
    }
})
</script>

<style scoped>

</style>