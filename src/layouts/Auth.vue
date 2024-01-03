<template>
	<div>
		<slot />
		<ModalBase />
		<PageLoading />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import { useCurrentUserProfile } from '@/composables/auth/profile/fetch'

const { fetchCurrentUserProfile } = useCurrentUserProfile()
onMounted(() => {
	fetchCurrentUserProfile()
})
</script>
