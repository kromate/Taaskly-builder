<template>
	<main class="main-layout">
		<div class="auth-box">
			<h1 class="auth-title">
				Welcome back
			</h1>
			<p class="text-sm text-center mb-2">
				{{ email ? 'Currently signing you in, kindly hold on':'kindly enter your email below' }}
			</p>
			<form v-if="!email" class="auth-form" @submit.prevent="useSignInWithEmailLink(credentienals.email.value)">
				<div class="field">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="credentienals.email.value"
						type="email"
						class="input-field"
						required
					>
				</div>
				<button class="btn-primary w-full mt-2" :disabled="passwordlessLoginLoading || disabled" type="submit" @click="send_email">
					<span v-if="!passwordlessLoginLoading"> 	Send link to email</span>
					<Spinner v-else />
				</button>
			</form>
			<div v-else class="flex flex-col items-center justify-center ">
				<Spinner class="!border-t-dark !bg-line" size="40px" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { usePasswordlessSignin } from '@/composables/auth'

const { credentienals, loading: passwordlessLoginLoading, initAuth, email, disabled, useSignInWithEmailLink } = usePasswordlessSignin()
initAuth()

definePageMeta({
	layout: 'auth',
	middleware: 'is-not-authenticated'
})

</script>

<style scoped></style>
