<template>
  <header class="py-[1em] px-[1.5rem] flex items-center justify-between bg-dark">
    <div>
      <h1 class="text-white text-[1.5rem]">
        Button Component
      </h1>
    </div>
    <div>
      <button class="modal-btn-sm text-light border-light">
        <span>Save Changes</span>
      </button>
    </div>
  </header>
  <Repl style="height:calc(100vh - 72px)" />
</template>

<script setup lang="ts">
import Repl from '@/editors/vue/Repl.vue'
</script>

<style scoped></style>
