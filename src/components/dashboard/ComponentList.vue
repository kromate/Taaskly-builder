<template>
  <section class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
    <TemplateCard
      v-for="component in component_list"
      :key="component.id"
      :data="component"
    />
    <article
      class="border border-primary rounded-md w-full h-[200px] shadow-xl p-4 flex flex-col justify-between relative"
    >
      <div class="flex flex-col gap-1">
        <h3 class="font-bold text-xl md:pr-6 pr-12">
          Let's get started on create your next awesome component
        </h3>
        <span>it's easier than you think</span>
        <shine class="absolute right-4 top-10 text-primary opacity-75" />
      </div>

      <button class="modal-btn">
        Create Component
        <Add />
      </button>
    </article>
  </section>
</template>

<script setup lang="ts">
import ComponentCard from './ComponentCard.vue'
import Add from '@/assets/icons/src/add.vue'
import Shine from '@/assets/icons/src/shine.vue'
import { useCoreModal } from '@/composables/core/modals'
import { useFetchUserComponents } from '@/composables/components/fetch'

const { fetch, loading, component_list } = useFetchUserComponents()
fetch()
</script>

<style scoped>
</style>
