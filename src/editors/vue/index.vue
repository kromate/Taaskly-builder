<template>
  <Repl
    :store="store"
    :theme="'dark'"
    :layout="'horizontal'"
    :ssr="true"
    :sfc-options="{ script: { inlineTemplate: false } }"
  />
</template>

<script setup lang="ts">
import { Repl, ReplStore } from './src'

const query = new URLSearchParams(location.search)
const store = ((window as any).store = new ReplStore({
  serializedState: location.hash.slice(1),
  showOutput: query.has('so'),
  outputMode: query.get('om') || 'preview',
  defaultVueRuntimeURL: import.meta.env.PROD
    ? undefined
    : `${location.origin}/src/vue-dev-proxy`,
  defaultVueServerRendererURL: import.meta.env.PROD
    ? undefined
    : `${location.origin}/src/vue-server-renderer-dev-proxy`
}))
</script>

<style scoped></style>
