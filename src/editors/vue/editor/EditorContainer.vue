<template>
  <!-- <FileSelector /> -->
  <div class="editor-container">
    <Monaco
    :filename="store.state.activeFile.filename"
    :value="store.state.activeFile.code"
    @change="onChange"
  />

    <Message v-show="showMessage" :err="store.state.errors[0]" />
    <MessageToggle v-model="showMessage" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import Monaco from '../monaco/Monaco.vue'
import Message from '../Message.vue'
import { debounce } from '../utils'
import { Store } from '../store'
// import FileSelector from './FileSelector.vue'
import MessageToggle from './MessageToggle.vue'

const SHOW_ERROR_KEY = 'repl_show_error'

const store = inject('store') as Store
const showMessage = ref(getItem())

const onChange = debounce((code: string) => {
  store.state.activeFile.code = code
}, 250)

function setItem() {
  localStorage.setItem(SHOW_ERROR_KEY, showMessage.value ? 'true' : 'false')
}

function getItem() {
  const item = localStorage.getItem(SHOW_ERROR_KEY)
  return !(item === 'false')
}

watch(showMessage, () => {
  setItem()
})
</script>

<style scoped>
.editor-container {
  /* height: calc(100% - var(--header-height)); */
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
