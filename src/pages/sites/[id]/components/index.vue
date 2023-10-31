<template>
	<div>
		<main class="p-4">
			<h1 class="mb-6 text-2xl font-bold capitalize">
				These are your List of Components
			</h1>

			<DashboardComponentsComponentList />
		</main>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped></style>
