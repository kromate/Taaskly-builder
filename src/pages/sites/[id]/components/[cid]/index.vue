<template>
  <main v-if="!loading">
  <header class="py-[1em] px-[1.5rem] flex items-center justify-between bg-dark">
    <div>
      <h1 class="text-white text-[1.5rem]">
        {{ componentData.name }}
      </h1>
    </div>
    <div>
      <button class="modal-btn-sm text-light border-light">
        <span>Save Changes</span>
      </button>
    </div>
  </header>
  <Repl style="height:calc(100vh - 72px)" />
  </main>
  <section class="grid grid-cols-2 gap-2 p-2" v-else>
  <Skeleton height="98vh" class="border border-dark" />
  <Skeleton height="98vh" class="border border-dark" />
  </section>
</template>

<script setup lang="ts">
import Repl from '@/editors/vue/Repl.vue'
import { useFetchCompnentById } from '@/composables/sites/components/id'

const siteId = useRoute().params.id as string
const compId = useRoute().params.cid as string

const { componentData, fetchComponentById, loading } = useFetchCompnentById()
fetchComponentById(siteId, compId)
</script>

<style scoped></style>
