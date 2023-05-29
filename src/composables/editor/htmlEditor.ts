import * as monaco from 'monaco-editor'

export let htmlEditor: monaco.editor.IStandaloneCodeEditor

export const mountHTMLEditor = (container: HTMLDivElement) => {
    htmlEditor = monaco.editor.create(container, {
        language: 'html',
        theme: 'vs-dark',
        lineHeight: 2
    })
}

export const unMountHTMLEditor = () => {
    htmlEditor?.dispose()
}
