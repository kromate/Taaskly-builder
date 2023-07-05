<template>
  <section class="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
    <DashboardComponentCard
      v-for="component in component_list"
      :key="component.id"
      :data="component"
    />
    <article
      class="border border-primary rounded-md w-[300px] h-[450px] shadow-xl p-4 flex flex-col justify-between relative"
    >
      <div class="h-[250px] border-2 rounded-lg mb-5" />
      <div class="flex flex-col gap-1 mb-5">
        <h3 class="font-bold text-xl md:pr-6 pr-12">
          Create your next awesome component
        </h3>
        <span>it's easier than you think</span>
      </div>

      <button class="modal-btn" @click="useCoreModal().openCreateComponent()">
        Create Component
        <Add />
      </button>
    </article>
  </section>
</template>

<script setup lang="ts">
import Add from '@/assets/icons/src/add.vue'
import { useCoreModal } from '@/composables/core/modals'
import { useFetchUserComponents } from '@/composables/components/fetch'

const { fetch, loading, component_list } = useFetchUserComponents()
fetch()
</script>

<style scoped>
</style>
