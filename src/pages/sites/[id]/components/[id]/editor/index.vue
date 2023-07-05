<!-- <template>
  <main>
    <div
      class="flex items-center justify-between bg-[#1e1e1e] px-[1.5rem] py-[1em]"
    >
      <div>
        <h1 class="text-[1.5rem] text-white">
Button Component
</h1>
      </div>
      <div>
        <button
          class="modal-btn-sm border-[#4f1ded] text-[#4f1ded] hover:bg-[#4f1ded]"
        >
          <span>Save Changes</span>
        </button>
      </div>
    </div>
    <div class="grid h-screen grid-cols-2">
      <div>
        <div class="flex w-full">
          <button
            v-for="(lang, index) in languages"
            :key="index"
            :class="[
              'flex-grow border border-black py-1 text-lg uppercase',
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
          class="h-full w-full"
          sandbox="allow-scripts allow-same-origin allow-modals"
        />
      </div>
    </div>
  </main>
</template> -->
<!--
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
</script> -->

<template>
  <div>hello</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
