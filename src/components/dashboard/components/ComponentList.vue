<template>
	<section v-if="!loading" class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
		<DashboardComponentsComponentCard v-for="component in component_list" :key="component.id" :data="component" />
		<article class="border border-primary rounded-md w-full h-[450px] shadow-xl p-4 flex flex-col justify-between relative">
			<div class="h-[250px] border-2 rounded-lg mb-5" />
			<div class="flex flex-col gap-1 mb-5">
				<h3 class="font-bold text-xl md:pr-6 pr-12">
					Create your next awesome component
				</h3>
				<span>it's easier than you think</span>
			</div>

			<button class="modal-btn" @click="useBuilderModal().openCreateComponent()">
				Create Component
				<Add />
			</button>
		</article>
	</section>
	<section v-else class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
		<Skeleton v-for="n in 3" :key="n" height="450px" radius="0.375rem" />
	</section>
</template>

<script setup lang="ts">
import Add from '@/assets/icons/src/add.vue'
import { useBuilderModal } from '@/composables/core/modals'
import { useFetchSiteComponents } from '@/composables/sites/components/fetch'

const { fetch, loading, component_list } = useFetchSiteComponents()
const site_id = useRoute().params.id as string
fetch(site_id)
</script>

<style scoped></style>
