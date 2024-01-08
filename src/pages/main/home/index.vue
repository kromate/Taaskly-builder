<template>
	<main class="p-4 flex flex-col gap-4">
		<h1 class="capitalize font-bold text-2xl ">
			Hello World.
		</h1>

		<p class="mb-5">
			To be honest, this is an experimental project on the concept of website builders
		</p>

		<DashboardTemplatesTemplateList />
	</main>
</template>

<script setup>
import { useUser } from '@/composables/auth'

definePageMeta({
  layout: 'dashboard'
})
const { username } = useUser()
</script>

<style lang="scss" scoped></style>
