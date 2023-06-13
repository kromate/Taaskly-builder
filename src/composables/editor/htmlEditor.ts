import * as monaco from 'monaco-editor'
import { useStorage, useDebounceFn, useResizeObserver } from '@vueuse/core'
import { initialEditorValue } from './initials'
export let htmlEditor: monaco.editor.IStandaloneCodeEditor
let editorObserver : any

const editorValue = useStorage('editor-value', initialEditorValue)
export const activeEditor = useStorage('language', 'html')

export const mountHTMLEditor = (container: HTMLDivElement, emit, language) => {
    htmlEditor = monaco.editor.create(container, {
        language: language === 'js' ? 'javascript' : language,
        theme: 'vs-dark',
        lineHeight: 2,
        minimap: {
            enabled: false
        },
        wordWrap: 'on'
    })
    editorObserver = useResizeObserver(container, () => {
        htmlEditor.layout()
    })
    htmlEditor.setValue(editorValue.value[language])
    htmlEditor.onDidChangeModelContent(() => {
        (useDebounceFn(() => {
            if (editorValue.value[language] !== htmlEditor.getValue()!) {
                editorValue.value[language] = htmlEditor.getValue()!
                emit('change', editorValue.value)
            }
        }, 500))()
    })

    emit('change', editorValue.value)

    if (editorValue.value[language]) {
        htmlEditor.setValue(editorValue.value[language])
    }
}

export const unMountHTMLEditor = () => {
    htmlEditor?.dispose()
}
