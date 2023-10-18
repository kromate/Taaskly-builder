<template>
  <main v-if="!loading">
  <header class="py-[1em] px-[1.5rem] flex items-center justify-between bg-dark">
    <div>
      <h1 class="text-white text-[1.5rem]">
        {{ componentData.name }}
      </h1>
      <span class="text-sm text-light italic">any props created must be an object will 'type' and 'default' key only</span>
    </div>
    <div>
      <button class="modal-btn-sm text-light border-light" @click="saveComponent" :disabled="updateCompLoading">
        <span v-if="!updateCompLoading">Save Changes</span>
        <Spinner v-else />
      </button>
    </div>
  </header>
  <Repl style="height:calc(100vh - 72px)" :store="store" />
  </main>
  <section class="grid grid-cols-2 gap-2 p-2" v-else>
  <Skeleton height="98vh" class="border border-dark" />
  <Skeleton height="98vh" class="border border-dark" />
  </section>
</template>

<script setup lang="ts">
import Repl from '@/editors/vue/Repl.vue'
import { useFetchCompnentById } from '@/composables/sites/components/id'

import { useUpdateComponent, getPropsFromString } from '@/composables/sites/components/update'

const siteId = useRoute().params.id as string
const compId = useRoute().params.cid as string

const { componentData, fetchComponentById, loading, store } = useFetchCompnentById()
const { updateCompLoading, updateComponent } = useUpdateComponent()
fetchComponentById(siteId, compId)

const saveComponent = () => {
  if (getPropsFromString(store.value.state.activeFile.compiled.js)) {
      updateComponent(siteId, compId, {
    code: store.value.state.activeFile.code,
    serializedState: store.value.serialize(),
    props: getPropsFromString(store.value.state.activeFile.compiled.js),
    compiled_css: store.value.state.activeFile.compiled.css,
    compiled_js: store.value.state.activeFile.compiled.js
  })
  }
}

</script>

<style scoped></style>
