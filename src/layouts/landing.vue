<template>
	<LayoutsHomeNavBar />
	<div class="relative min-h-screen  dots_bg">
		<slot />
	</div>

	<ModalBase />
	<Alert />
</template>

<script setup lang="ts">

</script>

<style scoped>
.dots_bg {
	background-image: radial-gradient(#4d1dedb3 .5px, #e5e5f79c 0.5px);
	background-size: 10px 10px;
}
</style>
