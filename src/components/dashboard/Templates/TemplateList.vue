<template>
	<section v-if="!loading" class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
		<DashboardTemplatesTemplateCard v-for="site in site_list" :key="site.id" :data="site" />

		<article class="border border-primary rounded-md w-full h-[200px] shadow-xl  p-4 flex flex-col justify-between relative">
			<div class="flex flex-col gap-1">
				<h3 class="font-bold text-xl md:pr-6 pr-12">
					Let's get started on create your next awesome website
				</h3>
				<span>it's easier than you think</span>
				<shine class="absolute right-4 top-10 text-primary opacity-75" />
			</div>

			<button class="modal-btn" @click="useBuilderModal().openCreateSite()">
				Create Site
				<Add />
			</button>
		</article>
	</section>
	<section v-else class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
		<Skeleton v-for="n in 3" :key="n" height="200px" radius="0.375rem" />
	</section>
</template>

<script setup lang="ts">
import Add from '@/assets/icons/src/add.vue'
import Shine from '@/assets/icons/src/shine.vue'
import { useBuilderModal } from '@/composables/core/modals'
import { useFetchUserSites } from '@/composables/sites/fetch'

const { fetch, loading, site_list } = useFetchUserSites()
fetch()
</script>

<style scoped></style>
