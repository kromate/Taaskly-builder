<script setup>
import { Repl } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import '@vue/repl/style.css'
</script>

<template>
  <div class="h-screen">
  <Repl :editor="Monaco" />
  </div>
</template>
