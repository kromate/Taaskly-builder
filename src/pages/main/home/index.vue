<template>
  <section class="px-4">
    <h1 class="capitalize mb-6 font-bold text-2xl">
      welcome back, {{ username }}
    </h1>

    <article
      class="border border-primary rounded-md w-[200px] h-[200px] shadow-xl py-6 px-3 flex flex-col justify-between"
    >
      <div class="flex flex-col gap-1">
        <h3 class="font-bold text-lg">
          Name of site
        </h3>
        <span class="text-xs">updated on 23 may, 2023</span>
      </div>

      <div class="flex gap-4 items-center">
        <button><Edit /> <span class="sr-only">edit</span></button>
        <button><Preview /><span class="sr-only">preview</span></button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { useUser } from '@/composables/auth'
import Edit from '@/assets/icons/src/edit.vue'
import Preview from '@/assets/icons/src/preview.vue'
definePageMeta({
  layout: 'default',
  middleware: ['has-no-profile']
})
const { username } = useUser()
</script>

<style lang="scss" scoped></style>
