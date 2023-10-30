<template>
	<div>
		<NuxtLayout> <NuxtPage /> </NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/auth/profile/create'
const { getProfile } = useProfile()
getProfile()
</script>

<style scoped>

</style>