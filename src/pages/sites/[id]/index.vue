<template>
  <div class="flex w-full justify-start px-3">
    <Tabs :selected="selected" :tabs="tabViews" @changed="updateTab($event)" />
  </div>

  <div class="mb-12">
    <keep-alive>
      <component :is="tabs[selected]" @changed="updateTab($event)" />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { useTabs } from '@/composables/utils/tabs'
import pages from '@/pages/sites/[id]/pages/index.vue'
import components from '@/pages/sites/[id]/components/index.vue'

const { initTabs, selected, tabViews, updateTab, tabs, onTabMounted } = useTabs()
initTabs('pages', ['pages', 'components'], markRaw({ pages, components }))

onMounted(() => {
  onTabMounted()
})

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped></style>
