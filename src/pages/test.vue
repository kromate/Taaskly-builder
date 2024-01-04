<template>
	<main v-if="!loading">
		<header class="py-[1em] px-[1.5rem] flex items-center justify-between bg-dark">
			<div class="flex gap-2 items-center flex-1 w-full">
				<button @click="$router.back()">
					<Icon name="back" class="w-7 cursor-pointer text-light" />
				</button>

				<h1 class="text-light text-[1.5rem]">
					{{ componentData.name }}
				</h1>
			</div>
			<div class="flex gap-4 w-auto">
				<button class="modal-btn-sm text-light border-light w-auto" :disabled="updateCompLoading" @click="useBuilderModal().openUpdateHash()">
					<span v-if="!updateCompLoading">update hash</span>
					<Spinner v-else />
				</button>
				<button class="modal-btn-sm text-light border-light w-auto" :disabled="updateCompLoading" @click="updateComponent(siteId, compId)">
					<span v-if="!updateCompLoading">Save Changes</span>
					<Spinner v-else />
				</button>
			</div>
		</header>
		<TestRepl style="height:calc(100vh - 72px)" />
	</main>
	<section v-else class="grid grid-cols-2 gap-2 p-2">
		<Skeleton height="98vh" class="border border-dark" />
		<Skeleton height="98vh" class="border border-dark" />
	</section>
</template>

<script setup lang="ts">
import TestRepl from '@/editors/vanilla/TestRepl.vue'
import { useFetchCompnentById } from '@/composables/sites/components/id'
import { useUpdateComponent } from '@/composables/sites/components/update'
import { useBuilderModal } from '@/composables/core/modals/index'

const siteId = 'test'
const compId = 'test'

const { componentData, fetchComponentById, loading } = useFetchCompnentById()
const { updateCompLoading, updateComponent } = useUpdateComponent()
fetchComponentById(siteId, compId)

</script>

<style scoped></style>
