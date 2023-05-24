<template>
	<main class="main-layout">
		<div class="auth-box">
			<icon name="check" class="w-14" />
			<h1 class="flex flex-col items-center text-xl font-bold">
				<span>A Link has been sent to </span>
				<span class="text-secondary">{{ email }}</span>
			</h1>
			<p class="text-sm font-semibold mt-4 italic">
				Open the link to sign in
			</p>
			<!-- <button class="btn-primary w-full mt-2" type="button" @click="send_email">
				Open Email
			</button> -->
		</div>
	</main>
</template>

<script setup lang="ts">

const email = useRoute().query.email

definePageMeta({
	layout: 'auth',
	middleware: 'is-not-authenticated'
})

</script>

<style scoped></style>
