<template>
  <section class="px-4">
    <h1 class="capitalize mb-6 font-bold text-2xl">
      welcome back, {{ username }}
    </h1>

    <section class="grid md:grid-cols-3">
      <DashboardTemplateList />
    </section>
  </section>
</template>

<script setup>
import { useUser } from '@/composables/auth'

definePageMeta({
  layout: 'default',
  middleware: ['has-no-profile', 'is-authenticated']
})
const { username } = useUser()
</script>

<style lang="scss" scoped></style>
