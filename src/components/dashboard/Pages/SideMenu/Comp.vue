<template>
	<section v-if="!loading && component_list.length > 0" class="flex flex-col px-5 gap-3">
		<div v-for="component in component_list" :key="component.id" class="flex items-center gap-3 bg-gray-100 p-2 rounded " @click="mountComponent(component)">
			<Avatar :name="component.name" :radius="24" :size="24" />
			<span class="font-semibold">{{ component.name }}</span>

			<div class="flex ml-auto">
				<Icon name="righty" class="w-6 cursor-pointer" />
			</div>
		</div>
	</section>

	<section v-else-if="loading" class="flex flex-col px-5 gap-3">
		<Skeleton v-for="n in 3" :key="n" height="40px" radius="4px" />
	</section>

	<section v-else class="flex flex-col px-5 gap-3">
		You have no components yet
	</section>
	<button class="btn-primary mx-auto mt-5" @click="useBuilderModal().openCreateComponent()">
		<span v-if="true">Create Component</span>
		<Spinner v-else />
	</button>
</template>

<script setup lang="ts">
import { useBuilderModal } from '@/composables/core/modals'
import { useFetchSiteComponents } from '@/composables/sites/components/fetch'
import { useMountComponent } from '@/composables/sites/pages/builder'

const { mountComponent } = useMountComponent()

const { fetch, loading, component_list } = useFetchSiteComponents()
const site_id = useRoute().params.id as string
fetch(site_id)

</script>

<style scoped></style>
