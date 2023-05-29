import * as monaco from 'monaco-editor'
import { ref } from 'vue'
import { useStorage, useDebounceFn } from '@vueuse/core'
import { initialEditorValue } from './initials'
export let htmlEditor: monaco.editor.IStandaloneCodeEditor

const editorValue = useStorage('editor-value', initialEditorValue)

export const mountHTMLEditor = (container: HTMLDivElement, emit) => {
    htmlEditor = monaco.editor.create(container, {
        language: 'html',
        theme: 'vs-dark',
        lineHeight: 2
    })
    htmlEditor.setValue(editorValue.value.html)
    htmlEditor.onDidChangeModelContent(() => {
        (useDebounceFn(() => {
            if (editorValue.value.html !== htmlEditor.getValue()!) {
                editorValue.value.html = htmlEditor.getValue()!
                emit('change', editorValue.value)
            }
        }, 500))()
    })

    emit('change', editorValue.value)

    if (editorValue.value.html) {
        htmlEditor.setValue(editorValue.value.html)
    }
}

export const unMountHTMLEditor = () => {
    htmlEditor?.dispose()
}
