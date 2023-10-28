<template>
  <section class="grid lg:grid-cols-3 md:grid-cols-2 gap-4" v-if="!loading">
    <DashboardPagesPageCard v-for="page in page_list" :key="page.id" :data="page" />
    <article class="border border-primary rounded-md w-full h-[450px] shadow-xl p-4 flex flex-col justify-between relative">
      <div class="h-[250px] border-2 rounded-lg mb-5" />
      <div class="flex flex-col gap-1 mb-5">
        <h3 class="font-bold text-xl md:pr-6 pr-12">
          Create your next awesome Page
        </h3>
        <span>it's easier than you think</span>
      </div>

      <button class="modal-btn" @click="useBuilderModal().openCreatePage()">
        Create Page
        <Add />
      </button>
    </article>
  </section>
  <section class="grid lg:grid-cols-3 md:grid-cols-2 gap-4" v-else>
    <Skeleton height="450px" radius="0.375rem" v-for="n in 3" :key="n" />
  </section>
</template>

<script setup lang="ts">
import Add from '@/assets/icons/src/add.vue'
import { useBuilderModal } from '@/composables/core/modals'
import { useFetchSitePages } from '@/composables/sites/pages/fetch'

const { fetch, loading, page_list } = useFetchSitePages()
const site_id = useRoute().params.id as string
fetch(site_id)
</script>

<style scoped></style>
