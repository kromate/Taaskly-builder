<template>
    <div ref="container" class="w-full h-full" />
</template>

<script setup lang="ts">
    import * as monaco from 'monaco-editor'
    import { ref, onMounted, onUnmounted } from 'vue'
    import { mountHTMLEditor, unMountHTMLEditor } from '@/composables/editor/htmlEditor'

    const container = ref<HTMLDivElement|null>(null)

    onMounted(() => {
        mountHTMLEditor(container.value!)
    })

    onUnmounted(() => {
        unMountHTMLEditor()
    })
</script>
