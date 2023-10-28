<template>
  <div>
    <div v-html="computedHTML_CSS.newHtml" />
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
    },
    hash: {
        type: String,
        required: true
    }
})

const html = ref(props.html)
const css = ref(props.css)
const js = ref(props.js)

const computedHTML_CSS = computed(() => {
   // Regular expression to match class names, id names and tag names in the HTML
  const regex = /class="(.*?)"/g
  const idRegex = /id="(.*?)"/g

  // Replace class names, id names and tag names in the HTML
  let newHtml = html.value.replace(regex, (match, className) => {
    let newClassNames = className.split(' ').map((name) => `${name}_${props.hash}`).join(' ')
    return `class="${newClassNames}"`
  }).replace(idRegex, (match, idName) => {
    return `id="${idName}_${props.hash}"`
  })

  // Regular expression to match class names, id names and tag names in the CSS
  const cssRegex = /\.([a-z0-9\-_]+)/gi
  const cssIdRegex = /#([a-z0-9\-_]+)/gi
  const cssTagRegex = /(\w+)(?=\s*{)/g

  // Replace class names, id names and tag names in the CSS
  let newCss = css.value.replace(cssRegex, (match, className) => {
    return `.${className}_${props.hash}`
  }).replace(cssIdRegex, (match, idName) => {
    return `#${idName}_${props.hash}`
  }).replace(cssTagRegex, (match, tagName) => {
    return `${tagName}_${props.hash}`
  })

 const jsVarFuncRegex = /(var|const|let)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g
  const jsIdClassRegex = /(['"`])#([a-z0-9\-_]+)\1/gi
  const jsLiteralIdRegex = /getElementById\('([a-z0-9\-_]+)'\)/gi
  const jsEventRegex = /(\w+)\.addEventListener\(/g
  const jsStyleRegex = /(\w+)\.style\./g

  console.log(js.value.replace(jsVarFuncRegex, (match, declarationType, name) => {
      console.log(declarationType)

      console.log(name)

      return `${declarationType} ${name}_${props.hash}`
  }))
  // Replace variable and function names, hashed IDs and classes, and literal IDs in the JavaScript code
  let newJs = js.value.replace(jsVarFuncRegex, (match, declarationType, name) => {
    return `${declarationType} ${name}_${props.hash}`
  }).replace(jsIdClassRegex, (match, quote, name) => {
    return `${quote}#${name}_${props.hash}${quote}`
  }).replace(jsLiteralIdRegex, (match, id) => {
    return `getElementById('${id}_${props.hash}')`
  }).replace(jsEventRegex, (match, variableName) => {
    return `${variableName}_${props.hash}.addEventListener(`
  }).replace(jsStyleRegex, (match, variableName) => {
    return `${variableName}_${props.hash}.style.`
  })

  console.log(newJs)
  return { newHtml, newCss, newJs }
})

onMounted(() => {
  applyCSS()
  applyJS()
})

const applyCSS = () => {
  const style = document.createElement('style')

  style.textContent = computedHTML_CSS.value.newCss
  document.head.appendChild(style)
}

const applyJS = () => {
  const script = document.createElement('script')
  script.textContent = computedHTML_CSS.value.newJs
  document.body.appendChild(script)
}
</script>

<style scoped>
/* Add any additional styles specific to this component */
</style>
