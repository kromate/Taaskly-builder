<template>
  <main>
    <!-- lorem1000 -->
    <!-- heyyy -->
    <div class="py-[1em] px-[1.5rem] flex items-center justify-between bg-[#1e1e1e]">
      <div>
        <h1 class="text-white text-[1.5rem]">Button Component</h1>
      </div>
      <div>
        <button
          class="modal-btn-sm text-[#4f1ded] border-[#4f1ded] hover:bg-[#4f1ded]"
        >
          <span>Save Changes</span>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 h-screen">
      <div>
        <div class="w-full flex">
          <button
            v-for="(lang, index) in languages"
            :key="index"
            :class="[
              'flex-grow text-lg uppercase py-1 border border-black',
              lang === activeEditor ? 'bg-black text-white' : ''
            ]"
            @click="changeEditor(lang)"
          >
            {{ lang }}
          </button>
        </div>
        <HTMLEditor :language="activeEditor" @change="onChange" />
      </div>
      <div>
        <iframe
          ref="iframe"
          class="w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-modals"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HTMLEditor from '@/components/editor/HTMLEditor.vue'
import { generateHtml } from '@/composables/editor/helpers'
import { activeEditor } from '@/composables/editor/htmlEditor'
import '@/composables/editor/useWorker'

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
