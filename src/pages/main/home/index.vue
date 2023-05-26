<template>
  <section class="px-4">
    <h1 class="capitalize mb-6 font-bold text-2xl">
      welcome back, {{ username }}
    </h1>

    <section class="grid grid-cols-3">
      <article class="border border-primary rounded-md w-full h-[200px] shadow-xl  p-4 flex flex-col justify-between relative">
        <div class="flex flex-col gap-1">
          <h3 class="font-bold text-xl pr-6">
            Let's get started on create your next awesome website
          </h3>
          <span>it's easier than you think</span>
          <shine class="absolute right-4 top-10 text-primary opacity-75" />
        </div>

        <button class="modal-btn">
          Create Site
          <Add />
        </button>
      </article>
    </section>
  </section>
</template>

<script setup>
import { useUser } from '@/composables/auth'
import Add from '@/assets/icons/src/add.vue'
import Shine from '@/assets/icons/src/shine.vue'
definePageMeta({
  layout: 'default',
  middleware: ['has-no-profile']
})
const { username } = useUser()
</script>

<style lang="scss" scoped></style>
