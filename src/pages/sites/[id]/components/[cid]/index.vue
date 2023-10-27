<template>
  <main v-if="!loading">
    <header class="py-[1em] px-[1.5rem] flex items-center justify-between bg-dark">
      <div class="flex gap-2 items-center">
        <button @click="$router.back()">
          <Icon name="back" class="w-7 cursor-pointer text-light" />
        </button>

        <h1 class="text-light text-[1.5rem]">
          {{ componentData.name }}
        </h1>
      </div>
      <div>
        <button class="modal-btn-sm text-light border-light" @click="updateComponent(siteId, compId)" :disabled="updateCompLoading">
          <span v-if="!updateCompLoading">Save Changes</span>
          <Spinner v-else />
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
import Repl from '@/editors/vanilla/Repl.vue'
import { useFetchCompnentById } from '@/composables/sites/components/id'

import { useUpdateComponent } from '@/composables/sites/components/update'

const siteId = useRoute().params.id as string
const compId = useRoute().params.cid as string

const { componentData, fetchComponentById, loading } = useFetchCompnentById()
const { updateCompLoading, updateComponent } = useUpdateComponent()
fetchComponentById(siteId, compId)

</script>

<style scoped></style>
