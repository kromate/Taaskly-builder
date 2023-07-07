<template>
  <main>
<div class="grid grid-cols-2 h-screen">
      <div>
<HTMLEditor :language="activeEditor" @change="onChange" />
      </div>
      <div>
        <iframe
          ref="iframe"
          title="vue preview"
          class="w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-mqodals"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HTMLEditor from '@/editors/vue/HTMLEditor.vue'
import { generateHtml } from '@/editors/vue/editor/helpers'
import { activeEditor } from '@/editors/vue/editor/htmlEditor'
import '@/editors/vue/editor/useWorker'

definePageMeta({
  layout: 'default'
})

const languages = ['html', 'css', 'js', 'Variables']
const iframe = ref<HTMLIFrameElement>()

const changeEditor = (lang) => {
  activeEditor.value = lang
}

const onChange = (payload) => {
  iframe.value!.srcdoc = generateHtml(payload)
}
</script>
