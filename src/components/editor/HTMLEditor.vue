<template>
    <div ref="container" class="w-full h-full" />
</template>

<script setup lang="ts">
    import * as monaco from 'monaco-editor'
    import { ref, onMounted } from 'vue'

    const container = ref<HTMLDivElement|null>(null)

    onMounted(() => {
        const html = monaco.editor.create(container.value!, { language: 'html', theme: 'vs-dark', lineHeight: 2 })
    })
</script>
