<template>
    <div ref="container" class="w-full h-full" />
</template>

<script setup lang="ts">
    import * as monaco from 'monaco-editor'
    import { ref, onMounted, onUnmounted, watch } from 'vue'
    import { useStorage } from '@vueuse/core'
    import { mountHTMLEditor, unMountHTMLEditor, activeEditor } from '@/editors/vue/editor/htmlEditor'
    import { initialEditorValue } from '@/editors/vue/editor/initials'

    const props = defineProps({
        language: {
            type: String,
            default: 'html'
        }
    })
    const container = ref<HTMLDivElement|null>(null)
    const editorValue = useStorage('editor-value', initialEditorValue)

    const emit = defineEmits<(e: 'change', payload: typeof editorValue.value) => void>()
    onMounted(() => {
        mountHTMLEditor(container.value!, emit, props.language)
    })
    watch(activeEditor, (val) => {
        unMountHTMLEditor()
        mountHTMLEditor(container.value!, emit, val)
    })
    onUnmounted(() => {
        unMountHTMLEditor()
    })
</script>
