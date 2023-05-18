<template>
	<div class="layout-body">
		<slot />
		<ModalBase />
		<PageLoading />
		<Alert />
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.layout-body{
	  background: var(--light);

}
</style>
