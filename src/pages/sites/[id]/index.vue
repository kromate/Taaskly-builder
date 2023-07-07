<template>
	<div class="flex w-full  justify-start px-3">
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
import page from '@/pages/sites/[id]/page/index.vue'
import component from '@/pages/sites/[id]/component/index.vue'

const { initTabs, selected, tabViews, updateTab, tabs, onTabMounted } = useTabs()
initTabs(
    'page',
    ['page', 'component'],
    markRaw({ page, component })
)

onMounted(() => {
    onTabMounted()
})

definePageMeta({
	layout: 'dashboard'
})
</script>

<style scoped></style>
