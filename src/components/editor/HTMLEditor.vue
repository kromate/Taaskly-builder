<template>
    <div ref="container" class="w-full h-full" />
</template>

<script setup lang="ts">
    import * as monaco from 'monaco-editor'
    import { ref, onMounted, onUnmounted } from 'vue'
    import { useStorage } from '@vueuse/core'
    import { mountHTMLEditor, unMountHTMLEditor } from '@/composables/editor/htmlEditor'
    import { initialEditorValue } from '@/composables/editor/initials'

    const container = ref<HTMLDivElement|null>(null)
    const editorValue = useStorage('editor-value', initialEditorValue)

    const emit = defineEmits<(e: 'change', payload: typeof editorValue.value) => void>()
    onMounted(() => {
        mountHTMLEditor(container.value!, emit)
    })

    onUnmounted(() => {
        unMountHTMLEditor()
    })
</script>
