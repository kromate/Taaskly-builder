<template>
     <article class="border border-primary rounded-md w-full h-[200px] shadow-xl  p-4 flex flex-col justify-between relative">
        <div class="flex flex-col gap-1">
          <h3 class="font-bold text-xl md:pr-6 pr-12">
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
</template>

<script setup lang="ts">
import Add from '@/assets/icons/src/add.vue'
import Shine from '@/assets/icons/src/shine.vue'
</script>

<style scoped>

</style>
