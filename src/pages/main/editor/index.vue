<template>
    <main>
        <div class="grid grid-cols-2 h-screen">
                <div>
                    <div>
                        <button v-for="(lang, index) in languages" :key="index" @click="changeEditor(lang)">
                            {{ lang }}
                        </button>
                    </div>
                    <HTMLEditor :language="activeEditor" @change="onChange" />
                </div>
            <div><iframe ref="iframe" class="w-full h-full" sandbox="allow-scripts allow-same-origin allow-modals" /></div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HTMLEditor from '@/components/editor/HTMLEditor.vue'
import { generateHtml } from '@/composables/editor/helpers'
import { activeEditor } from '@/composables/editor/htmlEditor'
definePageMeta({
    layout: 'default'
})

const languages = ['html', 'css', 'js']
const iframe = ref<HTMLIFrameElement>()

const changeEditor = (lang) => {
    activeEditor.value = lang
}

const onChange = (payload) => {
    iframe.value!.srcdoc = generateHtml(payload)
}
</script>
