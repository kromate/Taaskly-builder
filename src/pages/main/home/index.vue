<template>
  <main class="p-4">
    <h1 class="capitalize mb-6 font-bold text-2xl ">
      welcome back, {{ username }}
    </h1>

  <DashboardTemplateList />
  </main>
</template>

<script setup>
import { useUser } from '@/composables/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: ['has-no-profile', 'is-authenticated']
})
const { username } = useUser()
</script>

<style lang="scss" scoped></style>
