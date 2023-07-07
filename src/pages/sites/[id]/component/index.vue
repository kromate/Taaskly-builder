<template>
  <div>
    <main class="p-4">
      <h1 class="capitalize mb-6 font-bold text-2xl">
        These are your List of Components
      </h1>

      <DashboardComponentList />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
</style>
