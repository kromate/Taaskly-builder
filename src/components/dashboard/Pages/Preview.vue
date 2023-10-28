<template>
  <div>
    <div v-html="html" />

    <!-- {{ js }} <br> <br>
    {{ css }} <br> <br>
    {{ html }} -->
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  html: {
    type: String,
    required: true
  },
  css: {
    type: String,
    required: true
  },
  js: {
    type: String,
    required: true
    }

})

const html = ref(props.html)
const css = ref(props.css)
const js = ref(props.js)

onMounted(() => {
  applyCSS()
  applyJS()
})

const applyCSS = () => {
  const style = document.createElement('style')

//   style.textContent = computedHTML_CSS.value.newCss
  style.textContent = css.value
  document.head.appendChild(style)
}

const applyJS = () => {
  const script = document.createElement('script')
//   script.textContent = computedHTML_CSS.value.newJs
  script.textContent = js.value
  document.body.appendChild(script)
}
</script>

<style scoped>
/* Add any additional styles specific to this component */
</style>
