<template>
  <header class="py-[1em] px-[1.5rem] flex items-center justify-between bg-[#1e1e1e]">
    <div>
      <h1 class="text-white text-[1.5rem]">
        Button Component
      </h1>
    </div>
    <div>
      <button class="modal-btn-sm text-[#4f1ded] border-[#4f1ded] hover:bg-[#4f1ded]">
        <span>Save Changes</span>
      </button>
    </div>
  </header>
  <Repl />
</template>

<script setup lang="ts">
import Repl from '@/editors/vue/Repl.vue'
</script>

<style scoped></style>
